import { formats, getKit, type Format } from './catalog';
export type CartItem = { kitId: string; format: Format; quantity: number };
export const CART_KEY = 'au-petit-bonheur.cart.v1';
export const MAX_PRINTED = 99;
export function normalizeCart(input: unknown): CartItem[] {
  if (!Array.isArray(input)) return [];
  const result: CartItem[] = [];
  for (const row of input) {
    if (
      !row ||
      typeof row !== 'object' ||
      typeof row.kitId !== 'string' ||
      !getKit(row.kitId) ||
      !Object.hasOwn(formats, row.format) ||
      !Number.isInteger(row.quantity) ||
      row.quantity < 1
    )
      continue;
    const quantity =
      row.format === 'pdf' ? 1 : Math.min(MAX_PRINTED, row.quantity);
    const existing = result.find(
      (item) => item.kitId === row.kitId && item.format === row.format,
    );
    if (existing)
      existing.quantity =
        row.format === 'pdf'
          ? 1
          : Math.min(MAX_PRINTED, existing.quantity + quantity);
    else result.push({ kitId: row.kitId, format: row.format, quantity });
  }
  return result;
}
export function addToCart(
  items: CartItem[],
  kitId: string,
  format: Format,
): CartItem[] {
  if (!getKit(kitId) || !Object.hasOwn(formats, format))
    throw new Error('Kit ou format inconnu.');
  return normalizeCart([...items, { kitId, format, quantity: 1 }]);
}
export function cartTotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + formats[item.format].price * item.quantity,
    0,
  );
}
