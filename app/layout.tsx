import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/components/shop';
const sans = DM_Sans({ variable: '--font-body', subsets: ['latin'] });
const serif = DM_Serif_Display({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Au petit bonheur — Jouer comme les grands',
  description:
    'Restaurant, hôtel et spa : des kits de jeux de rôle pour parler, compter et grandir ensemble. PDF à 5 € ou kit imprimé et plastifié à 20 €.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${sans.variable} ${serif.variable}`}>
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
