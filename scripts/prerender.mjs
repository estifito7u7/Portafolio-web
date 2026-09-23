import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { preview } from 'vite';

// Capture the same React page delivered to visitors; no crawler-specific content.
const server = await preview({ preview: { host: '127.0.0.1', port: 4174, strictPort: true } });
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  // A production build must not depend on third-party fonts, images or contact services.
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' || url.protocol === 'data:'
      ? route.continue()
      : route.abort();
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' });
  await page.locator('#Contact').waitFor({ state: 'attached' });
  if (errors.length) throw new Error(errors.join('\n'));
  const snapshot = await page.evaluate(() => {
    const root = document.getElementById('root').cloneNode(true);
    root.setAttribute('data-prerendered', '');
    root.querySelectorAll('[data-aos]').forEach((node) => node.classList.add('aos-animate'));
    root
      .querySelectorAll('.is-hidden')
      .forEach((node) => node.classList.replace('is-hidden', 'bounce-in'));
    // Canvas pixels cannot be serialized. Interactive visuals mount on the client.
    root.querySelectorAll('canvas').forEach((node) => node.remove());
    const css = [...document.querySelectorAll('style[data-styled]')]
      .flatMap((style) => [...style.sheet.cssRules].map((rule) => rule.cssText))
      .join('\n');
    return { root: root.outerHTML, css };
  });
  let html = await readFile('dist/index.html', 'utf8');
  html = html
    .replace('<div id="root"></div>', snapshot.root)
    .replace('</head>', `<style id="prerender-styles">${snapshot.css}</style></head>`);
  await writeFile('dist/index.html', html);
  // JSON-LD is the only inline script; hash it instead of allowing inline JS.
  const hashes = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => `'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`,
  );
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://res.cloudinary.com",
    "connect-src 'self' https://api.emailjs.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
  await writeFile('dist/_headers', `/*\n  Content-Security-Policy: ${csp}\n`);
  console.log('Prerendered landing page and generated hashed CSP.');
} finally {
  await browser?.close();
  await new Promise((resolve, reject) =>
    server.httpServer.close((error) => (error ? reject(error) : resolve())),
  );
}
