import type { Metadata } from 'next';
import { CartContents } from '@/components/shop';
export const metadata: Metadata = { title: 'Mon panier | Au petit bonheur' };
export default function CartPage() {
  return (
    <main id="contenu-principal" className="wrap cart-page">
      <p className="eyebrow">VOS PROCHAINES HISTOIRES</p>
      <h1>Votre petit panier</h1>
      <CartContents />
    </main>
  );
}
