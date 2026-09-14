import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPages } from '../scripts/build.mjs';
import { kits } from '../assets/catalog.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = renderPages();
const read = (file) => readFile(join(root, file), 'utf8');

test('les pages publiées sont à jour', async () => {
  for (const page of pages) {
    assert.equal(
      await read(page.file),
      page.html,
      `${page.file} ne correspond plus au catalogue : lancer « npm run build ».`,
    );
  }
});

test('chaque kit a sa page et son entrée sur l’accueil', async () => {
  const home = pages.find((page) => page.file === 'index.html').html;
  for (const kit of kits) {
    assert.ok(
      pages.some((page) => page.file === `kits/${kit.id}/index.html`),
      `page manquante pour ${kit.id}`,
    );
    assert.match(home, new RegExp(`href="kits/${kit.id}/"`));
    assert.ok(home.includes(kit.quote), `citation absente pour ${kit.id}`);
  }
});

test('aucun lien ni aucune ressource n’est absolu, sauf sur la page 404', () => {
  for (const page of pages.filter((item) => item.file !== '404.html')) {
    const absolute = page.html.match(/(?:href|src)="\/[^"]*"/g) ?? [];
    assert.deepEqual(absolute, [], `${page.file} contient un chemin absolu`);
  }
});

test('la page 404 pointe vers le site avec son chemin public', () => {
  const notFound = pages.find((page) => page.file === '404.html').html;
  assert.match(notFound, /href="\/LesPetitsBonheurs\/assets\/site\.css"/);
  assert.match(notFound, /src="\/LesPetitsBonheurs\/assets\/site\.js"/);
});

test('chaque page porte son titre, sa description et le panier', () => {
  for (const page of pages) {
    assert.match(page.html, /<title>[^<]+<\/title>/);
    assert.match(page.html, /<meta name="description" content="[^"]+"/);
    assert.match(page.html, /data-cart-count/);
    assert.match(page.html, /data-cart-body/);
  }
});

test('les images du catalogue existent dans le dépôt', async () => {
  for (const kit of kits) {
    await readFile(join(root, kit.image));
  }
});
