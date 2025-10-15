# Geochronos: Geological Timelines for Obsidian

**A fork of [Chronos Timeline](https://github.com/clairefro/obsidian-plugin-chronos) adapted for geological time scales.**

Render interactive geological timelines in your Obsidian notes using millions of years (Ma) instead of modern dates. Perfect for geologists, paleontologists, educators, and anyone working with deep time.

Powered by the [vis-timeline](https://www.npmjs.com/package/vis-timeline) library.

![demo](./docs/ex-main-demo.gif)

## What is Geochronos?

Geochronos is a fork of the Chronos Timeline plugin, specifically adapted to create **geological timelines**. While the original Chronos is designed for modern, calendar-based events (days, months, years), Geochronos allows you to work with the vast scales of geological time using **millions of years (Ma)** as the primary unit.

It maintains full compatibility with the original Chronos syntax for modern dates, but it shines when visualizing the deep history of our planet.

## Key Features

- **Geological Date Format**: Use `Ma` (millions of years) as the standard date format (e.g., `66Ma`, `252.1Ma`).
- **Automatic Scaling**: The timeline axis intelligently displays labels in **Ga** (billions), **Ma** (millions), or **Ka** (thousands) of years, depending on the zoom level.
- **Built-in ICS Data**: Includes geological period data based on the official **International Chronostratigraphic Chart (2024)**.
- **Geological Flags**: Add official geological eons, eras, periods, epochs, and ages as background lanes for context using simple flags like `> PERIODS`.
- **Full Backwards Compatibility**: Still works perfectly with modern `YYYY-MM-DD` dates from the original Chronos plugin.

## Installation

1.  Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2.  Create a new folder in your Obsidian vault's plugins directory named `geochronos`. The path will be `<YourVault>/.obsidian/plugins/geochronos/`.
3.  Copy the three downloaded files into this new folder.
4.  Open Obsidian and go to **Settings** → **Community plugins**.
5.  If "Safe mode" is on, you will need to disable it.
6.  Click the "Reload plugins" button.
7.  Find "Geochronos - Geological Timelines" in the list and enable it.

To verify the installation, open the command palette (`Ctrl/Cmd + P`) and search for "Geochronos". You should see commands to insert example timelines.

## Quickstart

Create a `geochronos` code block in any note and add your events. This example visualizes the Mesozoic Era.

````markdown
```geochronos
# Mesozoic Era - "Age of Reptiles"

@ [251.9Ma~66Ma] #cyan Mesozoic Era

@ [251.9Ma~201.3Ma] #purple Triassic Period
- [252Ma] #red Permian-Triassic Extinction

@ [201.3Ma~145Ma] #blue Jurassic Period
- [150Ma] Archaeopteryx appears

@ [145Ma~66Ma] #green Cretaceous Period
- [66Ma] #red K-Pg Extinction | Dinosaurs go extinct
```
````

## Syntax Guide

Geochronos parses special syntax inside a `geochronos` code block. The first character of each line determines the item type.

### Geological Date Format (`Ma`)

The primary date format for Geochronos is **Ma** (millions of years before present).

-   `252Ma` - 252 million years ago
-   `66.0Ma` - 66.0 million years ago
-   `0.0117Ma` - 11,700 years ago (the format will automatically switch to Ka)

For date ranges, use a tilde `~`. The start and end dates must be in chronological order (older value first).
-   `[251.9Ma~66Ma]` - A range spanning from 251.9 to 66 million years ago.

### Item Types

-   **Events (`-`)**: A point or range in time.
    -   `-[Date] Event Name`
    -   `-[Date~Date] Event Name`
-   **Periods (`@`)**: A background span, useful for showing eras or phases.
    -   `@[Date~Date] Period Name`
-   **Points (`*`)**: A point in time, displayed as a dot on the timeline.
    -   `*[Date] Point Name`
-   **Markers (`=`)**: A vertical line marking a specific time.
    -   `=[Date] Marker Name`
-   **Comments (`#`)**: Lines starting with `#` are ignored.

### Modifiers

Add modifiers to Events, Periods, and Points to change their appearance. They must be placed between the date and the name.

-   **Colors (`#color`)**: Use predefined colors (`#red`, `#blue`, etc.) or hex codes (`#FF5733`).
    -   `-[66Ma] #red K-Pg Extinction`
-   **Groups (`{Group Name}`)**: Group items into "swimlanes".
    -   `-[150Ma] {Jurassic} Archaeopteryx`

**Order**: Color must come before the group if both are used.
`-[Date] #color {Group} Name`

### Flags (`>`)

Flags are special commands on their own line that modify the entire timeline.

-   `> NOTODAY`: Hides the vertical bar that marks the current day.
-   `> HEIGHT <px>`: Sets a fixed height for the timeline in pixels (e.g., `> HEIGHT 300`).
-   `> ORDERBY <field>`: Orders overlapping items. (e.g., `> ORDERBY start`).
-   `> DEFAULTVIEW <start>|<end>`: Sets the initial visible range. (e.g., `> DEFAULTVIEW 252Ma|66Ma`).

### Geological Flags

These are the most powerful feature of Geochronos. Add official geological time scales as background lanes to your timeline for context. You can stack multiple flags.

-   `> EONS`
-   `> ERAS`
-   `> PERIODS`
-   `> EPOCHS`
-   `> AGES` (or `> STAGES`)

## Examples Gallery

### 1. Phanerozoic Eon with Mass Extinctions

A high-level overview of the last ~540 million years, highlighting the "Big Five" mass extinctions.

```geochronos
# Phanerozoic Eon - "Visible Life"

@ [538.8Ma~251.902Ma] #green {Paleozoic} Paleozoic Era
@ [251.902Ma~66Ma] #cyan {Mesozoic} Mesozoic Era
@ [66Ma~0.0209Ma] #yellow {Cenozoic} Cenozoic Era

# Mass Extinctions
- [443.8Ma] #red {Paleozoic} Ordovician-Silurian Extinction
- [372.2Ma] #red {Paleozoic} Late Devonian Extinction
- [252Ma] #red {Paleozoic} Permian-Triassic Extinction | The Great Dying
- [201.3Ma] #red {Mesozoic} Triassic-Jurassic Extinction
- [66Ma] #red {Mesozoic} K-Pg Extinction | End of the dinosaurs
```

### 2. Cenozoic example with points, markers and groups

This example shows a typical Cenozoic timeline but includes "points" (single occurrences), "markers" and grouping by region or taxon. Use groups for swimlanes (e.g. geographic regions or taxonomic clades) — geological periods are rendered as background lanes via flags and should not be duplicated as groups.

```geochronos
# Cenozoic Era - "Age of Mammals"
> PERIODS
> EPOCHS
> AGES

@ [66Ma~0.0209Ma] #yellow Cenozoic Era

> DEFAULTVIEW 66Ma|0.02Ma

- [65Ma] {North America} Diversification of mammals
* [56Ma] {Eurasia} First horses (point occurrence)
- [50Ma] {North America} India collides with Asia | Tectonic event recorded in deposits
- [34Ma] {Europe} Grande Coupure | Major turnover (range/pulse)
- [23Ma~20Ma] {North America} Grassland expansion (range)
- [5.3Ma] {North America} Messinian-related marine event
- [2.6Ma] {Canids} First widespread Canid fossils
- [0.3Ma] {Hominins} Homo sapiens appears
- [0.07Ma] Out of Africa | Marker for dispersal event

// Example: a point inside a group (single specimen occurrence)
* [0.012Ma] {Hominins} "Fin de la Edad de Hielo" | single occurrence point (interpreted as 12.0 Ka)

```

### 3. Faunal occurrences and taxonomic groups (useful example)

Instead of using geological periods as groups (they are already shown as background lanes), this example shows how to use groups for taxonomic clades or geographic regions to plot first/last occurrences and specimen records.

```geochronos
# Faunal occurrences — taxonomic groups and specimen points
> AGES

@ [23Ma~2.6Ma] #cyan {Neogene} Neogene overview

- [22Ma] {Canids} Early Canid diversification | range start
- [18Ma] {Canids} Canid peak diversity
- [5Ma] {Canids} Modern Canid radiation

- [20Ma] {Felids} Early Felid appearance
* [3.6Ma] {Felids} Specimen: Panthera sp. (fossil locality A)

- [2.6Ma] {Hominins} Beginning of ice-age cycles
* [0.3Ma] {Hominins} Homo sapiens appears

// Groups here are taxonomic swimlanes; geological flags provide the background timescales
```

## Differences from Original Chronos

| Feature | Chronos | Geochronos |
|---------------|-------------------|--------------------------|
| **Date Format** | `YYYY-MM-DD` | `Ma` (millions of years) |
| **Primary Use** | Modern History | Geological Time |
| **Time Axis** | Years/months/days | Ga/Ma/Ka |
| **Min Scale** | Second | ~21,000 years (Ka) |
| **Max Scale** | ~9,500 years | 4,600 million years |
| **Special Flags** | None | `EONS`, `ERAS`, `PERIODS`... |

## Dynamic Timelines (with Dataview)

You can use the [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) plugin to create dynamic timelines that automatically update from your notes. This requires enabling JavaScript queries in Dataview's settings.

The following example creates a timeline from notes in a "Dinosaurs" folder, using frontmatter fields `born_in_ma` and `died_in_ma`.

````markdown
```dataviewjs
const pages = dv.pages('"Dinosaurs"').where(p => p.born_in_ma);

let events = pages.map(p => {
    const name = p.file.name;
    const start = p.born_in_ma + "Ma";
    const end = p.died_in_ma ? "~" + p.died_in_ma + "Ma" : "";
    return `- [${start}${end}] {${p.period}} ${name}`;
}).join("\n");

const geochronosBlock = ````markdown
```geochronos
> PERIODS

# Dinosaur Timeline
${events}
```
````;

dv.paragraph(geochronosBlock);
```
````

## Known Limitations

- **Timeline Range**: To avoid technical issues with the underlying visualization library, the timeline is strictly locked to a range between **4600 Ma** and **20,900 years ago (0.0209 Ma)**. It is not possible to view dates more recent than this limit.
- **Zoom Precision**: The maximum zoom level is limited to a range of approximately 0.01 million years. This is to prevent a situation where zooming further does not provide additional detail due to the fixed two-decimal precision of the `Ma` labels.

These limitations are necessary because `vis-timeline`, the library that powers Geochronos, is fundamentally designed for calendar dates, not for a purely numeric, scientific scale. The current implementation is a workaround to adapt it for geological use.

## Development and Contributing

This is an educational/scientific fork of the Chronos plugin. To contribute to the original project, please visit [github.com/clairefro/obsidian-plugin-chronos](https://github.com/clairefro/obsidian-plugin-chronos).

To compile the plugin:
```bash
npm install
npm run build
```

## Credits

- **Original Plugin**: [Chronos Timeline](https://github.com/clairefro/obsidian-plugin-chronos) by Claire Froelich
- **Geological Data**: [International Chronostratigraphic Chart](https://stratigraphy.org) (ICS)
- **Visualization Library**: [vis-timeline](https://visjs.github.io/vis-timeline/docs/timeline/)