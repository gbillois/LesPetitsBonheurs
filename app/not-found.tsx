import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="contenu-principal" className="wrap editorial-header">
      <p className="eyebrow">CETTE PORTE N’EST PAS ENCORE OUVERTE</p>
      <h1>Ce kit est introuvable.</h1>
      <p>Retrouvez les univers disponibles dans la collection.</p>
      <Link href="/#les-kits" className="button">
        Voir les kits
      </Link>
    </main>
  );
}
