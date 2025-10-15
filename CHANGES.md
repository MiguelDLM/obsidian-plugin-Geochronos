# Resumen de Cambios - Geochronos

## Adaptación del Plugin Chronos para Escalas de Tiempo Geológicas

Este documento resume las modificaciones realizadas al plugin Chronos Timeline para adaptarlo al uso geológico (Geochronos).

## Archivos Nuevos Creados

### 1. `lib/geologicalTimeScale.ts`
- **Propósito**: Define todos los periodos geológicos basados en el ICS Chart 2024
- **Contenido**:
  - Interface `GeologicalPeriod` con propiedades: name, start, end, color, rank, parent
  - Array `GEOLOGICAL_TIME_SCALE` con ~100 periodos geológicos
  - Funciones auxiliares:
    - `getGeologicalPeriod(name)`: Buscar periodo por nombre
    - `getPeriodsByRank(rank)`: Filtrar por rango (Eon, Era, Period, Epoch, Age)
    - `findPeriodAtTime(ma, rank?)`: Encontrar periodo que contiene una fecha Ma
    - `getChildPeriods(parentName)`: Obtener sub-periodos
    - `formatMa(ma)`: Formatear Ma para visualización

### 2. `util/geologicalDateUtil.ts`
- **Propósito**: Manejo de fechas en formato Ma (millones de años)
- **Estrategia**: Convierte Ma a fechas ISO "virtuales" que vis-timeline puede procesar
  - 0 Ma = año 2000 (presente)
  - 4600 Ma = año -4,599,998,000
- **Funciones principales**:
  - `isGeologicalDate(dateStr)`: Detecta formato "252Ma"
  - `parseMa(dateStr)`: Parsea string a número
  - `maToISO(ma)`: Convierte Ma a ISO date string
  - `isoToMa(isoStr)`: Convierte ISO date string a Ma
  - `geologicalDateToISO(geologicalDateStr)`: Conversión directa
  - `formatMaDisplay(ma)`: Formatea para mostrar (Ma, Ka, Ga)
  - `validateGeologicalDate(dateStr)`: Validación
  - `parseFlexibleDate(dateStr)`: Acepta formato Ma o ISO

### 3. `lib/geologicalAxisFormatter.ts`
- **Propósito**: Formateador personalizado para el eje temporal
- **Funciones**:
  - `formatGeologicalAxis(date, scale, step)`: Formatea etiquetas del eje según la escala
    - < 1000 años: "X ya" (years ago)
    - < 1 Ma: "X.X Ka" (miles de años)
    - 1-10 Ma: "X.XX Ma" (2 decimales)
    - 10-100 Ma: "X.X Ma" (1 decimal)
    - 100-1000 Ma: "X Ma" (entero)
    - ≥ 1000 Ma: "X.XX Ga" (miles de millones)
  - `formatModernDate(date, scale)`: Para fechas CE (compatibilidad)
  - `getGeologicalPeriodForDate(date)`: Obtiene nombre del periodo geológico

### 4. `GEOCHRONOS.md`
- **Propósito**: Documentación completa del plugin adaptado
- **Contenido**:
  - Introducción y características
  - Formato de fechas geológicas
  - Ejemplos de uso (Mesozoico, Precámbrico, Evolución humana)
  - Sintaxis completa
  - Colores disponibles
  - Escala temporal automática
  - Comandos disponibles
  - Compatibilidad con fechas modernas
  - Datos geológicos incluidos
  - Casos de uso
  - Diferencias con Chronos original

## Archivos Modificados

### 5. `lib/ChronosMdParser.ts`
**Cambios**:
- Importa funciones de `geologicalDateUtil.ts`
- **Modificación del regex en `_parseTimeItem`**:
  - Patrón actualizado para aceptar formato Ma: `(-?\\d{1,}(?:\\.\\d+)?\\s*Ma|...)`
  - Acepta formatos como "252Ma", "66.0Ma", "0.012Ma"
- **Función `processDate` añadida**:
  - Detecta si es fecha geológica con `isGeologicalDate()`
  - Valida con `validateGeologicalDate()`
  - Convierte a ISO con `geologicalDateToISO()`
  - Mantiene compatibilidad con fechas ISO
- **Modificación de `_validateDate`**:
  - Valida fechas geológicas con `validateGeologicalDate()`
  - Valida fechas UTC con `validateUTCDate()` (original)

### 6. `lib/ChronosTimeline.ts`
**Cambios**:
- Importa `formatGeologicalAxis`
- **Modificación de `_getTimelineOptions`**:
  - Añade configuración `format` con formateadores personalizados
  - `minorLabels.year` y `majorLabels.year` usan `formatGeologicalAxis`
  - Mantiene formatos originales para escalas menores (minute, hour, day, etc.)

### 7. `util/smartDateRange.ts`
**Cambios**:
- Importa funciones de `geologicalDateUtil.ts`
- **Función `_isGeologicalTime` añadida**: Detecta fechas < año 0
- **Modificación de `smartDateRange`**:
  - Detecta tiempo geológico con `_isGeologicalTime()`
  - Convierte a Ma con `isoToMa()`
  - Formatea con `formatMaDisplay()` o `formatMaRange()`
  - Fallback a formato original si falla

### 8. `util/snippets.ts`
**Cambios**:
- **Añadidas dos plantillas nuevas**:
  - `templateGeological`: Ejemplo de Era Mesozoica
  - `templateGeologicalPrecambrian`: Ejemplo de Precámbrico
- Mantiene plantillas originales (templateBlank, templateBasic, templateAdvanced)

### 9. `main.ts`
**Cambios**:
- Importa nuevas plantillas: `templateGeological`, `templateGeologicalPrecambrian`
- **Añadidos dos comandos nuevos**:
  - `insert-timeline-geological`: Inserta plantilla Mesozoico
  - `insert-timeline-geological-precambrian`: Inserta plantilla Precámbrico
- Mantiene comandos originales

### 10. `README.md`
**Cambios**:
- Título actualizado: "Geochronos: Geological Timelines for Obsidian"
- Añadida sección "New in Geochronos"
- Link a documentación completa (GEOCHRONOS.md)
- Ejemplos de uso con fechas Ma
- Sección de comandos actualizada
- Mantiene información relevante del original

### 11. `manifest.json`
**Cambios**:
- `id`: "chronos" → "geochronos"
- `name`: "Chronos Timeline" → "Geochronos - Geological Timelines"
- `version`: "1.4.0" → "1.5.0"
- `description`: Actualizada para mencionar uso geológico
- `author`: Actualizado para mencionar fork

### 12. `package.json`
**Cambios**:
- `name`: "chronos" → "geochronos"
- `version`: "1.4.0" → "1.5.0"
- `description`: Actualizada para mencionar uso geológico

## Estrategia de Compatibilidad

### Mantiene funcionalidad original
- ✅ Fechas modernas (ISO) siguen funcionando exactamente igual
- ✅ Todas las funcionalidades originales se preservan
- ✅ Comandos originales disponibles
- ✅ Plantillas originales disponibles

### Añade funcionalidad geológica
- ✅ Nuevo formato de fecha: `Ma`
- ✅ Detección automática de tipo de fecha (geológica vs moderna)
- ✅ Conversión transparente entre formatos
- ✅ Visualización adaptada según escala temporal
- ✅ Plantillas específicas para geología

## Principio de Diseño

**Mínima invasión**: Los cambios se hicieron de manera que:
1. No rompen funcionalidad existente
2. Se añaden capas de detección y conversión
3. El código original se ejecuta si no se detectan fechas geológicas
4. Las modificaciones son extensiones, no reemplazos

## Fuente de Datos Geológicos

- **Origen**: International Chronostratigraphic Chart (ICS) 2024
- **URL**: https://github.com/i-c-stratigraphy/chart/blob/main/chart.ttl
- **Formato**: RDF/Turtle
- **Datos extraídos**: ~100 periodos geológicos con:
  - Nombres en inglés
  - Fechas de inicio/fin en Ma
  - Colores oficiales (códigos hex)
  - Jerarquía (Eon > Era > Period > Epoch > Age)

## Compilación y Uso

Para compilar el plugin:

```bash
npm install
npm run build
```

Para desarrollo:

```bash
npm run dev
```

Los archivos compilados (`main.js`, `styles.css`, `manifest.json`) se deben copiar a:
```
<vault>/.obsidian/plugins/geochronos/
```

## Ejemplos de Uso

### Formato Ma simple
```markdown
- [252Ma] Extinción Pérmica
- [66.0Ma] Extinción K-Pg
```

### Rangos de tiempo
```markdown
@ [251.902Ma~201.3Ma] Período Triásico
@ [66Ma~0Ma] Era Cenozoica
```

### Con colores y grupos
```markdown
@ [251.902Ma~66Ma] #cyan {Mesozoico} Era Mesozoica
- [252Ma] #red {Triásico} Extinción Pérmica-Triásica
- [201Ma] #red {Jurásico} Extinción Triásica-Jurásica
- [66Ma] #red {Cretácico} Extinción K-Pg
```

## Limitaciones Conocidas

1. **Rango máximo de vis-timeline**: La librería vis-timeline tiene un límite de ~9500 años de zoom, pero esto se maneja internamente con la conversión a fechas virtuales
2. **Precisión numérica**: Para fechas muy antiguas (> 4000 Ma), la precisión puede verse afectada por límites de JavaScript Date
3. **Mezcla de escalas**: No se recomienda mezclar fechas geológicas (Ma) con fechas modernas en el mismo timeline debido a la enorme diferencia de escalas

## Créditos

- **Plugin original**: Chronos Timeline por Claire Froelich
- **Adaptación geológica**: Miguel DLM
- **Datos geológicos**: International Commission on Stratigraphy (ICS)
- **Librería de visualización**: vis-timeline
