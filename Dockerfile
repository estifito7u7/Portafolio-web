# syntax=docker/dockerfile:1
FROM node:26-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
RUN npx playwright install --with-deps chromium

COPY . .

# These identifiers are public and are compiled into the browser bundle.
ARG VITE_EMAILJS_SERVICE_ID=""
ARG VITE_EMAILJS_TEMPLATE_ID=""
ARG VITE_EMAILJS_PUBLIC_KEY=""

RUN npm run build && node scripts/nginx-headers.mjs

FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime
LABEL org.opencontainers.image.title="Estifito Portafolio" \
      org.opencontainers.image.source="https://github.com/estifito7u7/Portafolio-web"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/nginx-security.conf /etc/nginx/security.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

USER 101:101
EXPOSE 8080
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
