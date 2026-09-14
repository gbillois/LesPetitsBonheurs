// Rendu du contenu du panier, partagé par le générateur de pages (état vide)
// et par le navigateur (état réel, relu depuis le stockage local).
import { formats, getKit, money } from './catalog.js';
import { cartTotal, MAX_PRINTED } from './cart.js';
import { icon } from './icons.js';

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function emptyCart(url) {
  return `<div class="empty-cart">
        ${icon('shopping-bag', 48, { strokeWidth: 1 })}
        <h3>Tout commence par une envie de jouer.</h3>
        <p>Votre panier est encore vide. Restaurant, hôtel ou spa : quelle sera leur prochaine histoire ?</p>
        <a class="button" href="${url('#les-kits')}" data-cart-dismiss>Découvrir les kits ${icon('arrow-right', 18)}</a>
      </div>`;
}

function cartLine(item, url) {
  const kit = getKit(item.kitId);
  const format = formats[item.format];
  const quantity = item.format === 'printed'
    ? `<div class="quantity">
                <button type="button" data-change="-1" data-kit="${kit.id}" data-format="${item.format}"
                  aria-label="Diminuer la quantité de ${escapeHtml(kit.name)}"${item.quantity <= 1 ? ' disabled' : ''}>${icon('minus', 15)}</button>
                <output aria-label="Quantité">${item.quantity}</output>
                <button type="button" data-change="1" data-kit="${kit.id}" data-format="${item.format}"
                  aria-label="Augmenter la quantité de ${escapeHtml(kit.name)}"${item.quantity >= MAX_PRINTED ? ' disabled' : ''}>${icon('plus', 15)}</button>
              </div>`
    : '<span class="small-note">1 exemplaire numérique</span>';
  return `<article class="cart-line">
            <a href="${url(`kits/${kit.id}/`)}" data-cart-dismiss><img src="${url(kit.image)}" alt="${escapeHtml(kit.name)}" /></a>
            <div>
              <h3>${escapeHtml(kit.name)}</h3>
              <p>${escapeHtml(format.label)}</p>
              <strong>${money(format.price * item.quantity)}</strong>
              <div class="quantity-line">
                ${quantity}
                <button type="button" class="remove" data-remove data-kit="${kit.id}" data-format="${item.format}"
                  aria-label="Retirer ${escapeHtml(kit.name)}, ${escapeHtml(format.label)}">${icon('trash-2', 17)}</button>
              </div>
            </div>
          </article>`;
}

function filledCart(items, url) {
  const shipping = items.some((item) => item.format === 'printed')
    ? '<p class="small-note">Livraison : modalités et frais à venir, non inclus dans ce total.</p>'
    : '';
  return `<div class="cart-lines">
          ${items.map((item) => cartLine(item, url)).join('\n          ')}
        </div>
        <div class="cart-summary">
          <div class="total-line">
            <span>Total des articles</span>
            <strong>${money(cartTotal(items))}</strong>
          </div>
          ${shipping}
          <div class="payment-note">
            <strong>La boutique prépare son ouverture.</strong>
            <p>Le paiement sera disponible prochainement. Aucune commande n’est passée et aucun montant n’est débité.</p>
          </div>
          <button class="button" type="button" disabled>Paiement bientôt disponible</button>
          <a class="text-link" href="${url('#les-kits')}" data-cart-dismiss>Continuer la découverte ${icon('arrow-right', 16)}</a>`
    + '\n        </div>';
}

export function cartBody(items, url) {
  return items.length ? filledCart(items, url) : emptyCart(url);
}

// Enveloppe commune au tiroir et à la page « Mon panier ».
export function cartContents(url) {
  return `<div class="cart-contents">
        <p class="cart-notice" aria-live="polite" data-cart-notice></p>
        <p class="small-note" data-cart-warning hidden>Votre navigateur ne permet pas d’enregistrer le panier. Gardez cette page ouverte pour conserver vos choix.</p>
        <div data-cart-body>
          ${cartBody([], url)}
        </div>
      </div>`;
}
