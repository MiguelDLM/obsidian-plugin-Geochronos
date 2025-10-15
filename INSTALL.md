# Instalación de Geochronos

## Instalación para Desarrollo

### Prerequisitos
- Node.js (v16 o superior)
- npm
- Obsidian instalado

### Pasos

1. **Clonar el repositorio**
```bash
cd /ruta/a/tu/obsidian/vault/.obsidian/plugins/
git clone <url-del-repo> geochronos
cd geochronos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Compilar el plugin**
```bash
# Para desarrollo (recompila automáticamente)
npm run dev

# Para producción
npm run build
```

4. **Activar en Obsidian**
- Abre Obsidian
- Ve a Settings → Community plugins
- Desactiva "Safe mode" si está activado
- Haz click en "Reload plugins"
- Busca "Geochronos" y actívalo

## Instalación Manual (Usuarios)

1. **Descargar archivos**
Descarga los siguientes archivos del release:
- `main.js`
- `manifest.json`
- `styles.css`

2. **Copiar a tu vault**
```bash
# Crea el directorio del plugin
mkdir -p /ruta/a/tu/vault/.obsidian/plugins/geochronos

# Copia los archivos
cp main.js manifest.json styles.css /ruta/a/tu/vault/.obsidian/plugins/geochronos/
```

3. **Activar en Obsidian**
- Reinicia Obsidian o recarga plugins
- Ve a Settings → Community plugins
- Activa "Geochronos - Geological Timelines"

## Verificación

Para verificar que el plugin está instalado correctamente:

1. Abre la paleta de comandos (`Ctrl/Cmd + P`)
2. Busca "Geochronos" o "geological"
3. Deberías ver comandos como:
   - Insert geological timeline example (Mesozoic)
   - Insert geological timeline example (Precambrian)

4. Prueba crear un timeline geológico:
````markdown
```geochronos
- [252Ma] Extinción Pérmica
- [66Ma] Extinción K-Pg
- [4540Ma] Formación de la Tierra
```
````

## Resolución de Problemas

### El plugin no aparece en la lista
- Verifica que los archivos están en la carpeta correcta: `.obsidian/plugins/geochronos/`
- Asegúrate de que el "Safe mode" está desactivado
- Intenta recargar Obsidian completamente (cierra y abre de nuevo)

### Errores de compilación
Si hay errores al ejecutar `npm run build`:

1. **Verifica la versión de Node.js**
```bash
node --version  # Debe ser v16 o superior
```

2. **Limpia y reinstala dependencias**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

3. **Verifica TypeScript**
```bash
npx tsc --version
```

### El timeline no se muestra
- Verifica que estás usando el formato correcto de fechas (`Ma`)
- Revisa la consola de desarrollador (Ctrl/Cmd + Shift + I) para ver errores
- Asegúrate de que el bloque de código usa `chronos` como lenguaje

### Las fechas Ma no se reconocen
- Verifica el formato: debe ser números seguidos de "Ma" (ej: `252Ma`, `66.0Ma`)
- No debe haber espacios entre el número y "Ma" (aunque se permite: `252 Ma`)
- Los decimales usan punto, no coma (ej: `66.0Ma`, no `66,0Ma`)

## Desinstalación

1. Ve a Settings → Community plugins
2. Desactiva "Geochronos"
3. Elimina la carpeta:
```bash
rm -rf /ruta/a/tu/vault/.obsidian/plugins/geochronos
```

## Actualización

### Desde el código fuente
```bash
cd /ruta/a/tu/vault/.obsidian/plugins/geochronos
git pull
npm install
npm run build
```

### Manual
1. Descarga los nuevos archivos del release
2. Sobrescribe los archivos en `.obsidian/plugins/geochronos/`
3. Recarga Obsidian

## Desarrollo

### Estructura del proyecto
```
geochronos/
├── main.ts                 # Plugin principal
├── manifest.json           # Metadatos del plugin
├── package.json           # Dependencias npm
├── tsconfig.json          # Configuración TypeScript
├── styles.css             # Estilos
├── lib/
│   ├── ChronosTimeline.ts         # Clase principal del timeline
│   ├── ChronosMdParser.ts         # Parser de markdown
│   ├── geologicalTimeScale.ts     # Datos geológicos (NUEVO)
│   └── geologicalAxisFormatter.ts # Formateador de eje (NUEVO)
└── util/
    ├── geologicalDateUtil.ts      # Utilidades de fechas Ma (NUEVO)
    ├── smartDateRange.ts          # Formateo de rangos
    └── snippets.ts                # Plantillas
```

### Hacer cambios

1. Edita los archivos TypeScript
2. El compilador recargará automáticamente si usaste `npm run dev`
3. Recarga el plugin en Obsidian (Ctrl/Cmd + R en el Developer Console)

### Testing

Para probar tus cambios:

1. Crea una nota de prueba en tu vault
2. Inserta un bloque de código chronos
3. Prueba diferentes formatos de fechas geológicas
4. Verifica la consola del desarrollador para errores

### Contribuir

Si encuentras bugs o tienes sugerencias:
1. Abre un issue en el repositorio
2. Describe el problema claramente
3. Incluye ejemplos de uso si es posible

## Compatibilidad

- **Obsidian**: v0.15.0 o superior
- **Node.js**: v16 o superior
- **NPM**: v7 o superior

## Recursos

- [Documentación completa](./GEOCHRONOS.md)
- [Resumen de cambios](./CHANGES.md)
- [Plugin original Chronos](https://github.com/clairefro/obsidian-plugin-chronos)
- [vis-timeline docs](https://visjs.github.io/vis-timeline/docs/timeline/)
- [ICS Chart](https://stratigraphy.org/chart)
