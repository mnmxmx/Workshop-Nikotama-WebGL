# Nikotama-WebGL

## Node.js
v19.7.0

## Setup
```bash
  npm install  
  npm run dev
```

## URL Query Specification

The displayed version and its runtime options are selected with URL query parameters.
Parameter names and values are case-sensitive.

### Versions

| Version | Query | Local URL |
| --- | --- | --- |
| Type 1 | `cubeType=type1` | `http://localhost:5173/?cubeType=type1` |
| Type 2 (default) | `cubeType=type2` | `http://localhost:5173/?cubeType=type2` |
| Type 3 | `cubeType=type3` | `http://localhost:5173/?cubeType=type3` |

### Parameters

| Parameter | Accepted values | Default | Description |
| --- | --- | --- | --- |
| `cubeType` | `type1`, `type2`, `type3` | `type2` | Selects the cube layout/version. |
| `debug` | `true` or `1` to enable; any other supplied value disables | `true` | Selects the debug camera and separated cube-face view. Use `debug=false` for the composed output. |
| `colorIndex` | Integer from `0` through `11` | Time-based preset | Selects the initial color preset. |
| `interval` | Positive integer, in seconds | `300` | Sets how often the color preset transitions to the next preset. |

Combine parameters with `&`. For example, the composed Type 3 version using color
preset 6 and changing color every 60 seconds is:

```text
http://localhost:5173/?cubeType=type3&debug=false&colorIndex=6&interval=60
```

Use the same query string after the path in deployed environments. Unsupported
parameter values are not part of the specification and should not be relied upon.