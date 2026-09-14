// Interface du site : panier local, tiroir latéral, choix du format.
// Le rendu des pages est statique ; ce fichier n’ajoute que l’interactivité.
import { formats, getKit, kits, money } from './catalog.js';
import { addToCart, cartTotal, normalizeCart, CART_KEY, MAX_PRINTED } from './cart.js';
import { cartBody } from './cart-view.js';

// Les pages vivent à des profondeurs différentes : « », « ../ » ou « ../../ ».
const base = document.documentElement.dataset.base ?? '';
const url = (path) => base + path;

let items = [];
let notice = '';
let storageWarning = false;
let lastTrigger = null;

function load() {
  try {
    items = normalizeCart(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
  } catch {
    storageWarning = true;
  }
}

function save() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    storageWarning = true;
  }
}

function render() {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  for (const badge of document.querySelectorAll('[data-cart-count]')) {
    badge.textContent = String(count);
  }
  for (const body of document.querySelectorAll('[data-cart-body]')) {
    body.innerHTML = cartBody(items, url);
  }
  for (const element of document.querySelectorAll('[data-cart-notice]')) {
    element.textContent = notice;
  }
  for (const element of document.querySelectorAll('[data-cart-warning]')) {
    element.hidden = !storageWarning;
  }
}

function update(next, message) {
  items = next;
  notice = message ?? notice;
  save();
  render();
}

function openCart(trigger) {
  lastTrigger = trigger ?? null;
  document.documentElement.setAttribute('data-cart-open', '');
  document.querySelector('[data-cart-close]')?.focus();
}

function closeCart() {
  document.documentElement.removeAttribute('data-cart-open');
  lastTrigger?.focus();
  lastTrigger = null;
}

function add(kitId, format, trigger) {
  const existing = items.find((item) => item.kitId === kitId && item.format === format);
  const message =
    existing && format === 'pdf'
      ? 'Ce PDF est déjà dans votre panier.'
      : existing && existing.quantity >= MAX_PRINTED
        ? 'La quantité maximale est déjà dans le panier.'
        : 'Votre kit a été ajouté au panier.';
  update(addToCart(items, kitId, format), message);
  openCart(trigger);
}

function remove(kitId, format) {
  update(
    items.filter((item) => item.kitId !== kitId || item.format !== format),
    'Le kit a été retiré du panier.',
  );
}

function change(kitId, format, delta) {
  update(
    items.map((item) =>
      item.kitId === kitId && item.format === format
        ? {
            ...item,
            quantity:
              format === 'pdf'
                ? 1
                : Math.min(MAX_PRINTED, Math.max(1, item.quantity + delta)),
          }
        : item,
    ),
  );
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const trigger = target.closest('[data-cart-trigger]');
  if (trigger) return openCart(trigger);

  if (target.closest('[data-cart-close]') || target.closest('[data-cart-overlay]')) {
    return closeCart();
  }
  if (target.closest('[data-cart-dismiss]')) return closeCart();

  const addButton = target.closest('[data-add]');
  if (addButton) {
    const purchase = addButton.closest('[data-purchase]');
    const format = purchase?.querySelector('input[name="format"]:checked')?.value ?? 'pdf';
    return add(addButton.dataset.kit, format, addButton);
  }

  const removeButton = target.closest('[data-remove]');
  if (removeButton) return remove(removeButton.dataset.kit, removeButton.dataset.format);

  const changeButton = target.closest('[data-change]');
  if (changeButton) {
    return change(
      changeButton.dataset.kit,
      changeButton.dataset.format,
      Number(changeButton.dataset.change),
    );
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.documentElement.hasAttribute('data-cart-open')) {
    closeCart();
  }
});

// Choix du format sur une fiche kit : l’encadré sélectionné et le prix du
// bouton suivent la case cochée.
document.addEventListener('change', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.name !== 'format') return;
  const purchase = input.closest('[data-purchase]');
  if (!purchase) return;
  for (const option of purchase.querySelectorAll('.format-option')) {
    option.classList.toggle('selected', option.contains(input) && input.checked);
  }
  const price = purchase.querySelector('[data-add] span');
  if (price) price.textContent = money(formats[input.value].price);
});

// WebMCP : mêmes outils que la version précédente, sur le même panier local.
function registerTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: 'read_kit_catalog',
      description: 'Lire les kits et les formats disponibles.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: () => ({ kits: kits.map((k) => ({ id: k.id, name: k.name })), formats }),
    },
    {
      name: 'read_cart',
      description: 'Lire le panier de kits, sans passer commande.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: () => ({ items, totalCents: cartTotal(items) }),
    },
    {
      name: 'stage_kit_in_cart',
      description: 'Ajouter un kit au panier local et ouvrir le panier. Aucun achat ni paiement.',
      inputSchema: {
        type: 'object',
        properties: {
          kitId: { type: 'string', enum: kits.map((k) => k.id) },
          format: { type: 'string', enum: Object.keys(formats) },
        },
        required: ['kitId', 'format'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: (input) => {
        if (!input || typeof input !== 'object') throw new Error('Paramètres manquants.');
        const { kitId, format } = input;
        if (!getKit(kitId) || !Object.hasOwn(formats, format)) {
          throw new Error('Kit ou format inconnu.');
        }
        add(kitId, format);
        return { items, totalCents: cartTotal(items), ordered: false };
      },
    },
  ];
  for (const tool of tools) {
    try {
      Promise.resolve(context.registerTool(tool)).catch(() => {});
    } catch {}
  }
}

load();
render();
registerTools();
