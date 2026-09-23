import assert from 'node:assert/strict';

const origin = process.env.CONTAINER_URL || 'http://127.0.0.1:8080';
const request = (path) => fetch(new URL(path, origin), { signal: AbortSignal.timeout(10_000) });
const home = await request('/');
assert.equal(home.status, 200);
const html = await home.text();
assert.match(html, /id="Projects"/);
assert.match(home.headers.get('content-security-policy'), /script-src 'self' 'sha256-/);
assert.equal(home.headers.get('x-content-type-options'), 'nosniff');
assert.equal(home.headers.get('x-frame-options'), 'DENY');
assert.match(home.headers.get('cache-control'), /must-revalidate/);
assert.equal((await request('/healthz')).status, 200);
for (const path of ['/missing-page', '/.env.local', '/_headers', '/src/app/App.tsx']) {
  const response = await request(path);
  assert.equal(response.status, 404, path);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
}
const bundle = html.match(/src="(\/assets\/[^" ]+\.js)"/)?.[1];
assert.ok(bundle, 'Missing application bundle');
assert.match((await request(bundle)).headers.get('cache-control'), /immutable/);
console.log('Container HTTP checks passed.');
