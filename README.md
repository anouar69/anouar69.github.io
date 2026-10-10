# A.D.G.B — Sitio web (rojo y negro, ES/EN)

Sitio estático, sin dependencias ni compilación. Funciona tal cual en **GitHub Pages**, gratis.

## Pestañas

| Pestaña    | Contenido                                                                 |
|------------|---------------------------------------------------------------------------|
| Inicio     | El significado de A.D.G.B, quién eres (pequeño programador que recién empieza), sello de la "A" roja y vista rápida de tus apps |
| Proyectos  | Un apartado por app: **Adownloader**, **Aplayer** y **Asteam**, cada uno con su biografía |
| Más        | Tus redes sociales (GitHub y las que quieras agregar)                     |

Todo está en una sola página: al cambiar de pestaña aparece una cortina roja con una "A" y cambia el contenido. Cada app también tiene su propio enlace directo, por ejemplo `https://adgb3264.github.io/#aplayer`.

## Archivos

| Archivo       | Para qué sirve                                      |
|---------------|-----------------------------------------------------|
| `index.html`  | Estructura y textos en español (idioma base)        |
| `styles.css`  | Diseño, colores, tipografía, animaciones, móvil     |
| `script.js`   | Pestañas, traducción ES/EN, transiciones, efectos   |
| `404.html`    | Página de error con el mismo estilo                 |

## Publicar en GitHub Pages (gratis)

1. Crea una cuenta en <https://github.com> si no tienes.
2. Crea un repositorio **público** llamado exactamente `adgb3264.github.io` (así tu sitio queda en `https://adgb3264.github.io`).
3. En el repositorio: **Add file → Upload files**, arrastra `index.html`, `styles.css`, `script.js` y `404.html`, y pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y guarda.
5. Espera 1–2 minutos y abre tu dirección. Si no aparece, recarga con `Ctrl + Shift + R`.

## Cuando una app esté lista para descargar

Lo más cómodo es usar **GitHub Releases** para alojar los archivos:

1. En el repositorio de la app: **Releases → Create a new release**, sube el instalador (`.exe`, `.zip`, etc.) y publícalo.
2. Copia el enlace del archivo.
3. En `index.html`, dentro del apartado de esa app (por ejemplo `id="adownloader"`), busca el botón:

   ```html
   <a href="#" class="btn btn--disabled" aria-disabled="true" data-i18n="dl.soon">Descarga próximamente</a>
   ```

   y cámbialo por:

   ```html
   <a href="PEGA-AQUI-EL-ENLACE" class="btn" data-i18n="dl.go">Descargar</a>
   ```

4. Cambia también la etiqueta "En desarrollo" por "Disponible" si quieres (en español en `index.html`, en inglés en `script.js`), y borra la nota `dl.note`.

## Agregar un proyecto nuevo

1. Copia un bloque `<article class="project" id="...">` completo en la pestaña Proyectos y cambia el `id`, el número (`04 / APP`), el nombre (la "A" va dentro de `<span class="a">A</span>`) y los textos.
2. Cada texto tiene `data-i18n="clave"`: agrega esa clave con su traducción al objeto `EN` al inicio de `script.js`.
3. Para que aparezca en el menú rápido, agrega su enlace en `<nav class="jump">`, una tarjeta en Inicio y su `id` en la lista `PROJECTS` de `script.js`.

## Personalizar

- **Significado de A.D.G.B:** en el inicio aparece como Avanzado · Dedicado · Genuino · Brillante. Para cambiar una palabra, edita su línea en `index.html` (`data-i18n="hero.l1"` a `hero.l4`) y su traducción en el objeto `EN` de `script.js`. La letra roja va dentro de `<span class="red">`.
- **Agregar otra red social:** en `index.html`, pestaña Más, copia el bloque `<li>` de GitHub dentro de `<ul class="channels">` y cambia el enlace, el nombre y el texto. Ejemplo:

  ```html
  <li>
    <a href="https://www.youtube.com/@tucanal" rel="noopener" target="_blank">
      <span class="channels__label">YouTube</span>
      <span class="channels__value">youtube.com/@tucanal</span>
      <span class="channels__go" aria-hidden="true">→</span>
    </a>
  </li>
  ```

  Cuando tengas varias redes, puedes borrar la fila "Próximamente" (`class="channels__soon"`).
- **Textos en español:** edítalos en `index.html`. **En inglés:** en el objeto `EN` de `script.js`. **En chino mandarín:** en el objeto `ZH` del mismo archivo. Todos usan la misma clave `data-i18n`; si cambias un texto, cambia también sus traducciones.
- **Colores:** al inicio de `styles.css`, en `:root`:

  ```css
  --red: #e10600;      /* rojo principal */
  --red-hot: #ff2a1f;  /* rojo brillante (acentos) */
  --black: #0a0a0a;    /* fondo */
  ```

- **Tipografía:** Chakra Petch (títulos, cuadrada), IBM Plex Sans (texto) e IBM Plex Mono (etiquetas), desde Google Fonts. Para cambiarlas, edita el `<link>` de fuentes en `index.html` y las variables `--font-*` en `styles.css`.
- **Dominio propio (opcional):** en *Settings → Pages → Custom domain*.

## Notas

- El idioma se detecta según el navegador y se recuerda la elección del visitante.
- Respeta la preferencia de "reducir movimiento" del sistema.
- Las tipografías necesitan conexión a internet para verse bien (el chino usa Noto Sans SC, también de Google Fonts).
- **Idiomas:** español, inglés y chino mandarín (中文). Se elige con los botones ES / EN / 中文 de la cabecera.
- **Sonido:** el botón con el altavoz, junto a los idiomas, activa o desactiva un sonido corto al apretar botones y enlaces. Viene **desactivado** por defecto y recuerda la elección del visitante. Los sonidos se generan en el navegador, no hay archivos de audio.
- **Celulares:** la cabecera se compacta en pantallas pequeñas, los botones son más grandes para el dedo, se respetan las zonas de la pantalla con muescas y los efectos de "pasar el mouse" se reemplazan por efectos al tocar.
