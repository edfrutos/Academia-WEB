# Academia Web

[![Screenshot check](https://github.com/edfrutos/Academia-WEB/actions/workflows/screenshot-check.yml/badge.svg)](https://github.com/edfrutos/Academia-WEB/actions/workflows/screenshot-check.yml)

Sitio web estático de una sola página para una academia de formación en desarrollo web. Construido únicamente con HTML, CSS y JavaScript, sin dependencias ni paso de compilación.

## Características

- Secciones de **Cursos**, **Tutoriales** y **Manuales**.
- Búsqueda en vivo que filtra el contenido a medida que escribes y oculta las secciones sin coincidencias.
- Diseño con cabecera y navegación basadas en flexbox.

## Estructura

| Archivo             | Descripción                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `academiaWeb.html`  | Página principal y punto de entrada del sitio.                     |
| `busqueda.js`       | Lógica de la búsqueda en vivo sobre las secciones de contenido.    |
| `style.css`         | Estilos de la página.                                              |

## Uso

Abre `academiaWeb.html` directamente en el navegador, o sirve el directorio de forma estática:

```bash
python3 -m http.server
```

Luego visita `http://localhost:8000/academiaWeb.html`.

No hay nada que compilar, lintar ni probar.
