// Petit serveur de prévisualisation, sans dépendance : node scripts/serve.mjs [port]
// Il sert les fichiers du dépôt sous le même préfixe que GitHub Pages, page 404
// comprise, pour que la prévisualisation reflète la mise en ligne.
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readBase } from './site-base.mjs';

const base = readBase();
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2] ?? 8000);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

async function resolve(pathname) {
  const candidate = join(root, normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, ''));
  for (const file of [candidate, join(candidate, 'index.html')]) {
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost');
  if (!pathname.startsWith(base)) {
    response.writeHead(302, { location: base });
    return response.end();
  }
  const requested = pathname.slice(base.length - 1);
  const file = await resolve(requested);
  const missing = join(root, '404.html');
  response.writeHead(file ? 200 : 404, {
    'content-type': types[extname(file ?? missing)] ?? 'application/octet-stream',
  });
  createReadStream(file ?? missing).pipe(response);
}).listen(port, () => console.log(`http://localhost:${port}${base}`));
