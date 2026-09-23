# Michael Fernández · Portafolio Full Stack

[![Quality](https://github.com/estifito7u7/Portafolio-web/actions/workflows/ci.yml/badge.svg)](https://github.com/estifito7u7/Portafolio-web/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Portafolio personal de Michael Fernández, desarrollador Full Stack. Una experiencia responsive para explorar proyectos, trayectoria, habilidades y servicios, disponible en español e inglés.

**[Visitar el portafolio](https://michaelfernadez.netlify.app/)** · [Ver validaciones](https://github.com/estifito7u7/Portafolio-web/actions) · [Reportar un problema](https://github.com/estifito7u7/Portafolio-web/issues)

## Características

- Interfaz responsive con traducciones en español e inglés.
- Secciones de proyectos, experiencia, educación, habilidades, servicios y contacto.
- Animaciones y elementos 3D con carga diferida.
- HTML prerenderizado, metadatos sociales, sitemap y recursos optimizados.
- Formulario con EmailJS y alternativas de contacto cuando no está configurado.
- Pruebas automatizadas y validaciones con GitHub Actions.

## Tecnologías y publicación

| Área               | Herramientas                                      |
| ------------------ | ------------------------------------------------- |
| Interfaz           | React 18, TypeScript, styled-components           |
| Compilación        | Vite, Node.js 24                                  |
| Idiomas y visuales | i18next, Three.js, Lottie                         |
| Calidad            | ESLint, Prettier, Playwright, Node.js test runner |
| Publicación        | Netlify; Docker con Nginx como alternativa        |

El sitio se publica en Netlify como archivos estáticos. La configuración de `netlify.toml` compila el proyecto y publica `dist`; no requiere ejecutar Docker en Netlify. El contenedor permite servir el mismo sitio en un entorno compatible con Docker.

## Desarrollo

Requiere Node.js 24 (ver `.nvmrc`).

```sh
npm ci
npx playwright install chromium
cp .env.example .env.local
npm run dev
```

En PowerShell: `Copy-Item .env.example .env.local`. El servidor escucha en `http://127.0.0.1:3000`. Para compartirlo en la red local, usa explícitamente `npm run dev -- --host`.

Configura los tres identificadores públicos de EmailJS en `.env.local` o en las variables de Netlify. Sin ellos, el formulario muestra las alternativas WhatsApp/LinkedIn. Vite incorpora estas variables al compilar: hay que reconstruir después de cambiarlas. Ninguna variable `VITE_*` debe contener secretos.

## Arquitectura

```text
src/
  app/                 # Entrada, composición y proveedores
  features/            # Hero, skills, services, experience, projects, education, contact
  components/
    layout/            # Navegación, contenedor y pie de página
    ui/                # Componentes de interfaz
    shared/            # Límites de error y carga diferida
    visuals/           # Three.js y Lottie, cargados por separado
  data/                # Datos por sección; funciones de traducción sin hooks React
  hooks/               # Idioma y acceso a datos
  config/              # i18n y configuración pública del contacto
  types/               # Tema, traducciones y declaraciones de bibliotecas
  assets/              # Animación de perfil
  styles/              # Tema y estilos compartidos
  utils/               # Utilidades de animación
tests/
  unit/                # Validación de contacto
  e2e/                 # Navegación, HTML estático, recursos, CSP y formulario
scripts/               # Prerender y política de indexación de previews
public/                # Imágenes, modelo 3D, traducciones, robots y sitemap
```

La navegación usa anclas. Las funcionalidades consumen componentes compartidos y datos; los modelos específicos permanecen junto a su funcionalidad.

## Verificación

```sh
npm run lint
npm run format:check
npm run test:unit
npm run build
npm run test:e2e
npm audit --audit-level=high
```

`npm run format` aplica Prettier. El build incluye TypeScript, empaquetado y prerender; Playwright debe tener Chromium instalado. Los E2E usan el resultado en `dist`, en escritorio y móvil. No envían correos reales: cuando el formulario está configurado interceptan EmailJS. En CI se usan identificadores ficticios para comprobar ese flujo; ese artefacto no se despliega.

GitHub Actions ejecuta estos controles en pull requests y cambios en `main`/`master`. Dependabot propone actualizaciones semanales. Configura protección de ramas en GitHub si quieres exigir el job `verify` antes de fusionar.

## SEO y renderizado

`npm run build` genera una instantánea HTML del mismo árbol React mediante Chromium. Conserva los estilos de styled-components, las secciones y sus enlaces para visitantes sin JavaScript y rastreadores. React monta la aplicación interactiva al cargar; no se usa hidratación, porque las animaciones y los carruseles contienen estado de navegador. Esto tiene un coste de remontaje que conviene medir con Lighthouse en el alojamiento real. La instantánea no distingue robots de visitantes.

El script bloquea las peticiones externas durante el prerender: no necesita EmailJS, Cloudinary o Google Fonts para generar texto. Los gráficos se cargan de forma diferida; el contenido indexable no depende del scroll. Se incluyen H1, metadatos sociales, canonical, JSON-LD Person, `robots.txt`, `sitemap.xml` y una página 404 real. Los previews de Netlify reciben `X-Robots-Tag: noindex, nofollow`.

Al cambiar el dominio, actualiza `index.html`, `public/robots.txt`, `public/sitemap.xml`, `src/data/projects.ts` y la expectativa canonical del E2E. Las traducciones no tienen URL independiente: no se anuncian alternativos hreflang inexistentes. El contenido inicial indexable es español.

## Despliegue en Netlify

`netlify.toml` instala Chromium, ejecuta el build y publica `dist`. La integración Git de Netlify despliega los cambios del repositorio. Configura allí las tres variables públicas de EmailJS.

Los bundles con hash reciben caché larga; el HTML se revalida. Los archivos públicos sin hash no reciben caché inmutable. No hay una redirección comodín al index: las rutas inexistentes deben devolver 404 y las secciones usan fragmentos `#Projects`, etc.

Después de desplegar, verifica los encabezados de `/` y una ruta inexistente, comprueba las imágenes externas y envía el sitemap en Google Search Console. `vite preview` no aplica los encabezados de Netlify; el E2E de CSP simula el encabezado generado.

## Docker

Requiere Docker Engine o Docker Desktop con contenedores Linux y Docker Compose v2.

```sh
docker compose --env-file .env.local up --build -d --wait
```

Abre `http://localhost:8080`. Compose lee los identificadores públicos de EmailJS desde `.env.local` y los pasa al build. Los archivos `.env*` quedan fuera del contexto de Docker. Para ejecutar sin formulario, usa `--env-file .env.example`. Si cambian los identificadores, reconstruye la imagen; las variables de entorno del contenedor en ejecución no modifican el JavaScript compilado.

```sh
docker compose ps
docker compose logs -f web
node scripts/check-container.mjs
docker compose down
```

El Dockerfile separa la compilación con Node.js 24 y Chromium del servidor Nginx. La imagen final contiene únicamente el sitio y su configuración: no incluye Node.js, Chromium, código fuente ni dependencias npm.

El servidor se ejecuta como usuario `101`, escucha en el puerto `8080` y expone `/healthz`. Compose configura un sistema de archivos de solo lectura, espacio temporal en memoria, límites de recursos, rotación de logs y elimina las capacidades Linux. Nginx aplica compresión, caché para bundles con hash y la misma CSP generada para Netlify; las rutas inexistentes devuelven 404.

El puerto se publica solo en `127.0.0.1`. Para producción, coloca un proxy con HTTPS delante del contenedor y configura HSTS en ese proxy. Ajusta el dominio canonical y el sitemap antes de usar un dominio distinto. Las etiquetas de las imágenes base reciben actualizaciones; Dependabot revisa el Dockerfile semanalmente. Para una entrega inmutable, fija los digests de las imágenes aprobadas por tu pipeline.

El job `container` de GitHub Actions construye la imagen, espera su healthcheck y comprueba respuestas HTTP, cabeceras, caché y bloqueo de archivos internos. No publica imágenes en ningún registro.

Referencias: [build por etapas](https://docs.docker.com/build/building/multi-stage/), [Nginx sin privilegios](https://github.com/nginx/docker-nginx-unprivileged).

## Seguridad

- CSP generada en `dist/_headers`: scripts propios y hash del JSON-LD, sin `unsafe-eval` ni `unsafe-inline` para JavaScript. Los estilos inline siguen permitidos por styled-components y las animaciones.
- Orígenes externos limitados a Cloudinary, Google Fonts y EmailJS. Sin objetos embebidos ni uso de la página dentro de iframes.
- HSTS, `nosniff`, política de referencias y restricciones de cámara, micrófono, ubicación y pagos.
- Formulario con validación, límites de tamaño, campo señuelo, bloqueo de peticiones simultáneas y espera de 30 segundos; los errores no exponen respuestas internas ni se registran mensajes personales.
- Identificadores EmailJS fuera del código y archivos `.env` ignorados. La clave pública de EmailJS es pública por diseño, no una credencial de servidor.
- La validación y limitación en navegador son eludibles: configura dominios permitidos, cuotas y protección antiabuso en EmailJS. Si recibes abuso, activa CAPTCHA con validación del proveedor y adapta la CSP a los dominios requeridos. No se afirma protección anti-spam de servidor.
- Eliminar un archivo del árbol no borra su historial Git. Si alguna credencial privada estuvo versionada, revócala y trata el historial antes de compartirlo.

Referencias: [Google: JavaScript y SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Netlify: encabezados](https://docs.netlify.com/manage/routing/headers/), [EmailJS: opciones](https://www.emailjs.com/docs/sdk/options/).
