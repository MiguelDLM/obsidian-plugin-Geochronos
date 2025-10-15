# Geochronos: Geological Timelines for Obsidian

Geochronos es un fork de [Chronos Timeline](https://github.com/clairefro/obsidian-plugin-chronos) adaptado para crear **líneas de tiempo geológicas** en Obsidian. Mientras que Chronos está diseñado para eventos modernos (días, meses, años), Geochronos permite trabajar con escalas de tiempo geológicas usando millones de años (Ma).

## 🌍 Características principales

- **Formato de fechas geológicas**: Usa `Ma` (millones de años) en lugar de fechas de calendario
- **Compatibilidad**: Mantiene la compatibilidad con fechas modernas del plugin original
- **Datos ICS**: Basado en el International Chronostratigraphic Chart oficial
- **Periodos geológicos predefinidos**: Incluye Eons, Eras, Periods, Epochs y Ages
- **Visualización adaptada**: El eje temporal muestra Ma, Ka (miles de años) o Ga (miles de millones de años) según la escala

## 📅 Formato de fechas geológicas

En Geochronos, las fechas se especifican usando el formato `Ma` (millones de años antes del presente):

```markdown
- [252Ma] Extinción Pérmica
- [66Ma] Extinción de los dinosaurios  
- [4540Ma] Formación de la Tierra
```

### Ejemplos de formatos válidos:

- `252Ma` - 252 millones de años
- `66.0Ma` - 66 millones de años (con decimales)
- `0.0117Ma` - 11,700 años (Holoceno)
- `4600Ma` - 4600 millones de años (edad de la Tierra)

### Rangos de fechas

Usa `~` para especificar rangos de tiempo:

### Ejemplo 1: Era Mesozoica

```geochronos
# Era Mesozoica - "Edad de los Reptiles"

@ [251.902Ma~66Ma] #cyan {Mesozoico} Era Mesozoica

@ [251.902Ma~201.3Ma] #purple {Triásico} Período Triásico
- [252Ma] #red {Triásico} Extinción Pérmica-Triásica | El mayor evento de extinción

@ [201.3Ma~145Ma] #blue {Jurásico} Período Jurásico  
- [201Ma] #red {Jurásico} Extinción Triásica-Jurásica
- [150Ma] {Jurásico} Archaeopteryx | Primer dinosaurio con características de ave

@ [145Ma~66Ma] #green {Cretácico} Período Cretácico
- [125Ma] {Cretácico} Aparecen plantas con flores
- [66Ma] #red {Cretácico} Extinción K-Pg | Extinción de los dinosaurios
```

### Ejemplo 2: Historia temprana de la Tierra

```geochronos
# Precámbrico - Antes de la vida compleja

@ [4600Ma~538.8Ma] #pink Precámbrico

@ [4600Ma~4000Ma] #darkgray {Hadeano} Eón Hadeano
- [4540Ma] {Hadeano} Formación de la Tierra
- [4500Ma] {Hadeano} Impacto que formó la Luna
- [4400Ma] {Hadeano} Minerales más antiguos conocidos

@ [4000Ma~2500Ma] #pink {Arcaico} Eón Arcaico
- [3800Ma] {Arcaico} Rocas más antiguas
- [3500Ma] {Arcaico} Primera evidencia de vida
- [2700Ma] {Arcaico} Aparecen bacterias productoras de oxígeno

@ [2500Ma~538.8Ma] #orange {Proterozoico} Eón Proterozoico
- [2400Ma] {Proterozoico} Gran Evento de Oxidación
- [720Ma~635Ma] {Proterozoico} Tierra bola de nieve
- [635Ma] {Proterozoico} Biota ediacárica | Primeros organismos complejos
```

### Ejemplo 3: Evolución humana

```geochronos
# Evolución humana reciente

@ [7Ma~0Ma] #yellow Evolución de homínidos

- [7Ma] Sahelanthropus tchadensis | Posible ancestro común
- [4.2Ma] Australopithecus afarensis
- [3.2Ma] "Lucy" | Fósil famoso de Australopithecus
- [2.8Ma] Primeras herramientas de piedra
- [2Ma] Homo habilis
- [1.9Ma] Homo erectus
- [0.3Ma] Homo sapiens arcaico
- [0.3Ma~0.03Ma] #gray Neandertales
- [0.2Ma] Homo sapiens anatómicamente moderno
- [0.07Ma] Migración fuera de África
- [0.012Ma] Fin de la Edad de Hielo
```

## 🎨 Sintaxis completa

### Eventos
```markdown
- [Ma] #Color {Grupo} Nombre del evento | Descripción
```

### Períodos
```markdown
@ [Ma~Ma] #Color {Grupo} Nombre del período | Descripción
```

### Puntos
```markdown
* [Ma] #Color {Grupo} Punto de referencia | Descripción
```

### Marcadores
```markdown
= [Ma] Marcador temporal
```

### Comentarios
```markdown
# Esto es un comentario (se ignora)
```

## 🎨 Colores disponibles

Puedes usar colores predefinidos con `#`:
- `#red`, `#orange`, `#yellow`, `#green`, `#cyan`, `#blue`, `#purple`, `#pink`
- `#gray`, `#darkgray`, `#lightgray`

O códigos hexadecimales:
- `#FF5733`, `#3498DB`, etc.

## 📊 Escala temporal automática

Geochronos ajusta automáticamente la visualización según el rango de tiempo:

- **< 1000 años**: Muestra en años (ya)
- **< 1 Ma**: Muestra en miles de años (Ka)
- **< 1000 Ma**: Muestra en millones de años (Ma)
- **≥ 1000 Ma**: Muestra en miles de millones de años (Ga)

## 🔧 Comandos disponibles

Usa la paleta de comandos (`Ctrl/Cmd + P`) para:

- **Insert geological timeline example (Mesozoic)**: Inserta plantilla del Mesozoico
- **Insert geological timeline example (Precambrian)**: Inserta plantilla del Precámbrico
- **Insert timeline (blank)**: Timeline en blanco
- **Insert timeline example (basic)**: Ejemplo básico (fechas modernas)
- **Insert timeline example (advanced)**: Ejemplo avanzado (fechas modernas)

## 🔄 Compatibilidad con fechas modernas

Geochronos mantiene **total compatibilidad** con el formato de fechas modernas del plugin original:

```markdown
- [2024] Evento moderno
- [2024-01-15] Fecha específica
- [2024-01-15T14:30:00] Fecha con hora
```

Puedes **mezclar fechas geológicas y modernas** en el mismo timeline si es necesario, aunque generalmente no tiene sentido en la práctica debido a la enorme diferencia de escalas.

## 📚 Datos geológicos incluidos

Los datos de periodos geológicos están basados en el **International Chronostratigraphic Chart (2024)** del ICS (International Commission on Stratigraphy):

- **Eons**: Hadean, Archean, Proterozoic, Phanerozoic
- **Eras**: Paleozoic, Mesozoic, Cenozoic, etc.
- **Periods**: Cambrian, Ordovician, Silurian, Devonian, Carboniferous, Permian, Triassic, Jurassic, Cretaceous, Paleogene, Neogene, Quaternary
- **Epochs**: Holocene, Pleistocene, Pliocene, Miocene, etc.
- **Ages**: Centenares de subdivisiones específicas

Fuente: https://github.com/i-c-stratigraphy/chart

## 🎯 Casos de uso

- **Geología**: Visualizar periodos geológicos y eventos tectónicos
- **Paleontología**: Línea temporal de la evolución de especies
- **Astronomía**: Historia del Sistema Solar y la Tierra
- **Educación**: Enseñar escalas de tiempo geológico
- **Investigación**: Organizar datos geocronológicos

## 🔗 Diferencias con Chronos original

| Característica | Chronos | Geochronos |
|---------------|---------|------------|
| Formato de fecha | YYYY-MM-DD | Ma (millones de años) |
| Escala mínima | Segundo | ~1000 años |
| Escala máxima | ~9500 años | 4600 millones de años |
| Eje temporal | Años/meses/días | Ma/Ga/Ka |
| Uso típico | Historia moderna | Tiempo geológico |

## 🤝 Contribuir

Este es un fork educativo/científico del plugin Chronos. Para contribuir al proyecto original: https://github.com/clairefro/obsidian-plugin-chronos

## 📄 Licencia

MIT License - Igual que el proyecto original Chronos

## 🙏 Créditos

- **Plugin original**: [Chronos Timeline](https://github.com/clairefro/obsidian-plugin-chronos) por Claire Froelich
- **Datos geológicos**: [International Chronostratigraphic Chart](https://stratigraphy.org) (ICS)
- **Librería de visualización**: [vis-timeline](https://visjs.github.io/vis-timeline/docs/timeline/)

---

*Para más información sobre el uso general del plugin, consulta la [documentación original de Chronos](https://github.com/clairefro/obsidian-plugin-chronos).*
