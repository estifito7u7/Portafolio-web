import { mkdir, readFile, writeFile } from 'node:fs/promises';

const headers = await readFile('dist/_headers', 'utf8');
const csp = headers.match(/^\s*Content-Security-Policy: (.+)$/m)?.[1];
if (!csp) throw new Error('Missing CSP: run npm run build first.');

// Keep the JSON-LD hash identical across Netlify and Nginx deployments.
const escape = (value) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\$/g, '\\$');
const values = {
  'Content-Security-Policy': csp,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};
await mkdir('build', { recursive: true });
await writeFile(
  'build/nginx-security.conf',
  Object.entries(values)
    .map(([name, value]) => `add_header ${name} "${escape(value)}" always;`)
    .join('\n') + '\n',
);
