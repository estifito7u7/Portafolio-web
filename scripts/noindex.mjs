import { appendFile } from 'node:fs/promises';
await appendFile('dist/_headers', '/*\n  X-Robots-Tag: noindex, nofollow\n');
