#!/usr/bin/env node
// Simple hot-reload helper: watches main.js and copies it to the target obsidian plugins folder
// Usage: node scripts/hot-reload.js [target-plugin-folder]

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const DEFAULT_TARGET = path.join(process.env.HOME || '~', '.config', 'obsidian', 'geochronos');
const target = process.argv[2] || process.env.OBSIDIAN_PLUGIN_DIR || DEFAULT_TARGET;

const src = path.join(process.cwd(), 'main.js');

if (!fs.existsSync(src)) {
  console.error('Source file main.js not found. Build it first.');
  process.exit(1);
}

// Ensure target directory exists
try {
  fs.mkdirSync(target, { recursive: true });
} catch (e) {
  console.error('Failed to create target dir', e);
  process.exit(1);
}

const copyFileIfExists = (srcPath, destPath) => {
  if (fs.existsSync(srcPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`[hot-reload] Copied ${path.basename(srcPath)} -> ${destPath} at ${new Date().toLocaleTimeString()}`);
  }
}

const copyDirIfExists = (srcDir, destDir) => {
  if (!fs.existsSync(srcDir)) return;
  // simple recursive copy
  const copyRecursive = (srcP, destP) => {
    const stat = fs.statSync(srcP);
    if (stat.isDirectory()) {
      fs.mkdirSync(destP, { recursive: true });
      for (const entry of fs.readdirSync(srcP)) {
        copyRecursive(path.join(srcP, entry), path.join(destP, entry));
      }
    } else {
      fs.mkdirSync(path.dirname(destP), { recursive: true });
      fs.copyFileSync(srcP, destP);
    }
  }
  try {
    copyRecursive(srcDir, destDir);
    console.log(`[hot-reload] Copied directory ${srcDir} -> ${destDir}`);
  } catch (e) {
    console.error('[hot-reload] Failed to copy directory', e);
  }
}

const copy = () => {
  // main bundle - copy atomically and only when stable
  const destMain = path.join(target, 'main.js');
  if (fs.existsSync(src)) {
    // wait until the source size is stable for two consecutive checks
    const isStable = () => {
      try {
        const s1 = fs.statSync(src).size;
        const t0 = Date.now();
        const wait = 100;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, wait);
        const s2 = fs.statSync(src).size;
        return s1 === s2;
      } catch (e) {
        return false;
      }
    };
    if (!isStable()) {
      // small synchronous spin-wait (best-effort)
      const start = Date.now();
      while (Date.now() - start < 2000) {
        if (isStable()) break;
      }
    }
    const tmp = destMain + '.tmp';
    copyFileIfExists(src, tmp);
    try {
      fs.renameSync(tmp, destMain);
      console.log(`[hot-reload] Atomically moved ${tmp} -> ${destMain}`);
    } catch (e) {
      // fallback to direct copy
      copyFileIfExists(src, destMain);
    }
  }

  // manifest
  const srcManifest = path.join(process.cwd(), 'manifest.json');
  const destManifest = path.join(target, 'manifest.json');
  copyFileIfExists(srcManifest, destManifest);

  // styles
  const srcStyles = path.join(process.cwd(), 'styles.css');
  const destStyles = path.join(target, 'styles.css');
  copyFileIfExists(srcStyles, destStyles);

  // assets folder
  const srcAssets = path.join(process.cwd(), 'assets');
  const destAssets = path.join(target, 'assets');
  copyDirIfExists(srcAssets, destAssets);

  // dev reloader plugin (optional helper)
  const srcReloader = path.join(process.cwd(), 'dev', 'reloader');
  const destReloader = path.join(path.dirname(target), 'geochronos-reloader');
  copyDirIfExists(srcReloader, destReloader);
}

// initial copy
copy();

const watcher = chokidar.watch(src, { persistent: true });
watcher.on('change', (pathChanged) => {
  try {
    copy();
  } catch (e) {
    console.error('Copy failed', e);
  }
});

console.log(`[hot-reload] Watching ${src} -> ${target}`);
process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});
