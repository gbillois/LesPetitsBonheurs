// Génère les pages HTML du site à la racine du dépôt, prêtes pour GitHub Pages.
// Usage : node scripts/build.mjs [--base /mon-depot/]
// `renderPages()` est aussi utilisé par les tests pour vérifier que les pages
// publiées correspondent bien au contenu du catalogue.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { kits } from '../assets/catalog.js';
import { layout, prefixes } from './layout.mjs';
import { readBase } from './site-base.mjs';
import {
  cartPage,
  classroomPage,
  guidePage,
  home,
  kitPage,
  notFoundPage,
} from './pages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Le 404 peut être servi depuis n’importe quelle profondeur : ses liens et ses
// ressources doivent donc être absolus, avec le chemin du site.
const siteBase = readBase();

const linker = (base) => (path) => base + path || './';

const pages = [
  {
    file: 'index.html',
    depth: 0,
    title: 'Au petit bonheur — Jouer comme les grands',
    description:
      'Restaurant, hôtel et spa : des kits de jeux de rôle pour parler, compter et grandir ensemble. PDF à 5 € ou kit imprimé et plastifié à 20 €.',
    body: home,
  },
  ...kits.map((kit) => ({
    file: `kits/${kit.id}/index.html`,
    depth: 2,
    title: `${kit.name} — Kit de jeu | Au petit bonheur`,
    description: kit.intro,
    body: (url) => kitPage(kit, url),
  })),
  {
    file: 'panier/index.html',
    depth: 1,
    title: 'Mon panier | Au petit bonheur',
    description: 'Les kits que vous avez mis de côté, conservés dans ce navigateur.',
    body: cartPage,
  },
  {
    file: 'preparer-son-kit/index.html',
    depth: 1,
    title: 'Imprimer, préparer et réutiliser son kit | Au petit bonheur',
    description:
      'Le guide pratique pour imprimer les PDF, découper, plastifier et organiser les jeux à la maison ou en classe.',
    body: guidePage,
  },
  {
    file: 'en-classe/index.html',
    depth: 1,
    title: 'Les kits en classe et en atelier | Au petit bonheur',
    description:
      'Installer un espace de jeu symbolique, faire tourner les rôles et observer des apprentissages concrets en petits groupes.',
    body: classroomPage,
  },
  {
    file: '404.html',
    depth: 0,
    absolute: true,
    title: 'Page introuvable | Au petit bonheur',
    description: 'Cette page n’existe pas ou plus.',
    body: notFoundPage,
  },
];

const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export function renderPages(base = siteBase) {
  return pages.map((page) => {
    const pageBase = page.absolute ? base : prefixes[page.depth];
    return {
      file: page.file,
      html: layout({
        title: escapeAttribute(page.title),
        description: escapeAttribute(page.description),
        base: pageBase,
        main: page.body(linker(pageBase)),
      }),
    };
  });
}

// Exécution directe : écrire les fichiers.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const { file, html } of renderPages()) {
    const target = join(root, file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html);
    console.log(`écrit  ${file}`);
  }
  // Sans ce fichier, GitHub Pages passerait le site dans Jekyll.
  await writeFile(join(root, '.nojekyll'), '');
  console.log('écrit  .nojekyll');
}
