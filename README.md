# Cinemateca — guía de despliegue

App web para gestionar tu colección de cine en físico, series y estrenos. PWA instalable con sincronización opcional entre dispositivos.

## Archivos

- `index.html` — la app completa
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` — PWA (instalación en móvil + offline)
- `supabase-setup.sql` — script para activar la sincronización

## 1. Publicar en GitHub Pages (gratis, ~5 min)

1. Crea cuenta en [github.com](https://github.com) y un repositorio nuevo (p. ej. `cinemateca`, público).
2. Sube **todos los archivos de esta carpeta** al repositorio (botón *Add file → Upload files*).
3. En el repositorio: *Settings → Pages → Source: Deploy from a branch → Branch: main → / (root) → Save*.
4. En 1-2 minutos tu app estará en `https://TUUSUARIO.github.io/cinemateca/`.

Alternativas igual de válidas: [Netlify](https://app.netlify.com/drop) o [Cloudflare Pages](https://pages.cloudflare.com) (arrastrar la carpeta).

## 2. Instalarla en el móvil (PWA)

- **Android/Chrome**: abre la URL → menú ⋮ → «Añadir a pantalla de inicio» (o el aviso «Instalar app»).
- **iPhone/Safari**: abre la URL → botón compartir → «Añadir a pantalla de inicio».

Se abre a pantalla completa como una app y la interfaz funciona sin conexión (los datos de TMDB requieren internet; los pósters ya vistos quedan en caché).

## 3. Sincronización entre dispositivos (opcional, gratis)

1. Crea una cuenta y un proyecto en [supabase.com](https://supabase.com) (plan Free).
2. En el proyecto: *SQL Editor → New query* → pega el contenido de `supabase-setup.sql` → *Run*.
3. En *Authentication → Sign In / Up* desactiva **Confirm email** (más cómodo).
4. En *Settings → API* copia la **Project URL** y la clave **anon public**.
5. En la app: *⚙️ Ajustes → Sincronización* → pega URL y clave → «Guardar conexión» → crea tu usuario (email + contraseña).
6. Repite el paso 5 en el móvil e inicia sesión con el mismo usuario: tu colección (y tus claves TMDB/OMDb) aparecerán solas.

Los cambios se suben automáticamente a los pocos segundos y se descargan al abrir la app o volver a ella. Tus datos quedan protegidos por Row Level Security: solo tu usuario puede leerlos.

## Claves de API (necesarias para buscar)

- **TMDB** (gratis): [themoviedb.org → Ajustes → API](https://www.themoviedb.org/settings/api)
- **OMDb** (opcional, notas IMDb/Metacritic): [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
