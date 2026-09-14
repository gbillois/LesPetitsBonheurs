// Gabarit commun : en-tête, tiroir du panier et pied de page.
import { icon } from '../assets/icons.js';
import { cartContents } from '../assets/cart-view.js';

// Chaque page connaît sa profondeur ; tous les liens et toutes les ressources
// sont relatifs, pour que le site fonctionne aussi bien à la racine d’un
// domaine que dans un sous-dossier comme celui de GitHub Pages.
export const prefixes = { 0: '', 1: '../', 2: '../../' };

export function layout({ title, description, base, main }) {
  const url = (path) => base + path;
  const home = base || './';
  return `<!doctype html>
<html lang="fr" data-base="${base}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="icon" href="${url('favicon.svg')}" />
    <link rel="preload" href="${url('assets/fonts/dm-sans-latin.woff2')}" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="${url('assets/fonts/dm-serif-display-latin.woff2')}" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="${url('assets/site.css')}" />
    <script type="module" src="${url('assets/site.js')}"></script>
  </head>
  <body>
    <a href="#contenu-principal" class="skip-link">Aller au contenu</a>
    <div class="announcement">À imprimer, à inventer, à recommencer.</div>
    <header class="header wrap">
      <a href="${home}" class="brand" aria-label="Au petit bonheur, accueil">
        Au petit<br /><span>bonheur<span class="brand-star">✳</span></span>
      </a>
      <nav aria-label="Navigation principale">
        <a href="${home}#les-kits">Les kits</a>
        <a href="${home}#pedagogie">Grandir en jouant</a>
        <a href="${url('preparer-son-kit/')}">Le petit guide</a>
      </nav>
      <button type="button" class="cart-button" data-cart-trigger aria-haspopup="dialog">
        ${icon('shopping-bag', 20)} Panier <span data-cart-count>0</span>
      </button>
    </header>
${main}
    <div class="cart-overlay" data-cart-overlay></div>
    <aside class="cart-sheet" role="dialog" aria-modal="true" aria-labelledby="titre-panier">
      <button type="button" class="close-cart" aria-label="Fermer le panier" data-cart-close>${icon('x', 22)}</button>
      <h2 class="cart-heading" id="titre-panier">Votre petit panier</h2>
      <p data-cart-description>De belles histoires en préparation.</p>
      ${cartContents(url)}
    </aside>
    <footer class="footer">
      <div class="wrap footer-inner">
        <a class="brand" href="${home}">Au petit<br />bonheur ✳</a>
        <p>Des petits jeux.<br />Des liens qui grandissent.</p>
        <div>
          <a href="${url('en-classe/')}">Pour la classe</a>
          <a href="${url('preparer-son-kit/')}">Impression &amp; préparation</a>
          <a href="${url('panier/')}">Mon panier</a>
          <span>© ${new Date().getFullYear()} Au petit bonheur</span>
        </div>
      </div>
    </footer>
  </body>
</html>
`;
}
