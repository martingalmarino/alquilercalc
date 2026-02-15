# Alquileres+AR

Calculadora premium para actualización de alquileres en Argentina. Proyecciones con 8 índices oficiales (ICL, CER, UVA, IPC, IS, IPIM, CAC, CasaPropia) y resultados compartibles.

## Cómo correr el proyecto

```bash
npm run dev
```

Build de producción:

```bash
npm run build
npm run start
```

## Estructura del proyecto

- `src/app`: páginas con App Router (landing, calculadora, resultados, índices, metodología, FAQ, guías).
- `src/components`: UI y módulos de calculadora.
- `src/lib`: motor de cálculo, formateadores, cache y fetchers de datos reales.
- `src/lib/fetchers`: clientes para datos.gob.ar y registry de fuentes de datos.
- `data`: tipos/metadata de índices, seeds para índices sin API pública, cache en disco.

## Fuentes de datos

| Índice     | Fuente                      | Método               |
|------------|-----------------------------|-----------------------|
| CER        | datos.gob.ar (BCRA)         | API series de tiempo  |
| UVA        | datos.gob.ar (BCRA)         | API series de tiempo  |
| IPC        | datos.gob.ar (INDEC)        | API series de tiempo  |
| IS (RIPTE) | datos.gob.ar (MTSS)         | API series de tiempo  |
| IPIM       | datos.gob.ar (INDEC)        | API series de tiempo  |
| ICL        | BCRA (seed manual)          | Datos semilla         |
| CAC        | CAC (seed manual)           | Datos semilla         |
| CasaPropia | Casa Propia (seed manual)   | Datos semilla         |

Los datos se cachean en memoria (15 min TTL) y en disco para minimizar llamadas externas.

## Scripts disponibles

- `npm run dev`: desarrollo
- `npm run build`: build producción
- `npm run start`: ejecutar build
- `npm run lint`: lint
