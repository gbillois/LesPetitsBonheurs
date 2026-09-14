import test from 'node:test';
import assert from 'node:assert/strict';
import { addToCart, normalizeCart, cartTotal } from './cart';
import { kits, formats } from './catalog';
test('un PDF ne peut être facturé deux fois', () => {
  let cart = addToCart([], 'restaurant', 'pdf');
  cart = addToCart(cart, 'restaurant', 'pdf');
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);
  assert.equal(cartTotal(cart), 500);
});
test('les deux formats coexistent et les exemplaires imprimés se cumulent', () => {
  let cart = addToCart([], 'hotel', 'pdf');
  cart = addToCart(cart, 'hotel', 'printed');
  cart = addToCart(cart, 'hotel', 'printed');
  assert.equal(cart.length, 2);
  assert.equal(cartTotal(cart), 4500);
});
test('les données restaurées sont validées et les prix ne viennent pas du stockage', () => {
  const cart = normalizeCart([
    { kitId: 'spa', format: 'pdf', quantity: 6, price: 1 },
    { kitId: 'spa', format: 'printed', quantity: 2 },
    { kitId: 'inconnu', format: 'pdf', quantity: 1 },
    { kitId: 'spa', format: 'gratuit', quantity: 1 },
    { kitId: 'spa', format: 'printed', quantity: -10 },
    { kitId: 'hotel', format: 'printed', quantity: 1.5 },
    null,
  ]);
  assert.equal(cart.length, 2);
  assert.equal(cartTotal(cart), 4500);
  assert.deepEqual(normalizeCart({}), []);
});
test('un panier corrompu ne multiplie pas les exemplaires sans limite', () => {
  const cart = normalizeCart([
    { kitId: 'hotel', format: 'printed', quantity: 98 },
    { kitId: 'hotel', format: 'printed', quantity: 99 },
  ]);
  assert.equal(cart[0].quantity, 99);
  assert.equal(cartTotal(cart), 198000);
});
test('suppression et panier vide ont le bon total', () => {
  const cart = addToCart(addToCart([], 'restaurant', 'printed'), 'spa', 'pdf');
  assert.equal(cartTotal(cart.filter((x) => x.kitId !== 'restaurant')), 500);
  assert.equal(cartTotal([]), 0);
});
test('un kit ou un format inconnu est refusé', () => {
  assert.throws(() => addToCart([], 'garage', 'pdf'));
  assert.throws(() => addToCart([], 'spa', 'unknown' as 'pdf'));
});
test('tous les kits du catalogue suivent les mêmes règles de prix', () => {
  assert.equal(new Set(kits.map((k) => k.id)).size, kits.length);
  for (const kit of kits) {
    assert.ok(
      kit.contents.length > 0 &&
        kit.steps.length > 0 &&
        kit.learning.length > 0,
    );
    for (const format of Object.keys(formats) as ('pdf' | 'printed')[]) {
      assert.equal(
        cartTotal(addToCart([], kit.id, format)),
        formats[format].price,
      );
    }
  }
});
