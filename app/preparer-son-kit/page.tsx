import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Printer,
  Scissors,
  Layers,
  FolderHeart,
} from 'lucide-react';
export const metadata: Metadata = {
  title: 'Imprimer, préparer et réutiliser son kit | Au petit bonheur',
  description:
    'Le guide pratique pour imprimer les PDF, découper, plastifier et organiser les jeux à la maison ou en classe.',
};
const steps = [
  {
    icon: Printer,
    title: 'Imprimer sans mauvaise surprise',
    text: 'Choisissez le format A4, la taille réelle (100 %) et la qualité élevée en couleur. Vérifiez l’aperçu et imprimez une page test avant de lancer tout le kit. Si un bord est coupé, adaptez la mise à l’échelle à la zone imprimable.',
    tip: 'Pour des cartes plus solides : du papier 160 à 200 g/m², si votre imprimante l’accepte. Le papier standard convient aussi, notamment avant plastification.',
  },
  {
    icon: Scissors,
    title: 'Découper et préparer les pièces',
    text: 'Découpez les supports selon leurs contours. L’adulte prépare les petites pièces et les découpes délicates. Les enfants peuvent participer selon leur aisance, avec des ciseaux adaptés.',
    tip: 'Gardez les affiches et tableaux entiers. Réunissez les cartes d’un même rôle avant de commencer à jouer.',
  },
  {
    icon: Layers,
    title: 'Protéger pour recommencer',
    text: 'Pour plastifier, suivez les consignes de l’appareil, manipulé par un adulte. Après plastification, conservez un bord scellé autour de chaque pièce et arrondissez les angles.',
    tip: 'Sans plastifieuse, glissez les tableaux dans des pochettes transparentes. Pour écrire puis effacer, testez un feutre compatible dans un petit coin.',
  },
  {
    icon: FolderHeart,
    title: 'Ranger pour la prochaine histoire',
    text: 'Classez les supports par usage : accueil, commandes ou rendez-vous, monnaie. Rangez les petits éléments dans des pochettes et les affiches à plat.',
    tip: 'Sur les surfaces plastifiées, utilisez un chiffon doux légèrement humide. Laissez sécher avant le rangement ; évitez chaleur et produits abrasifs.',
  },
];
export default function Guide() {
  return (
    <main id="contenu-principal" className="wrap guide-page">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span>Le petit guide</span>
      </nav>
      <header className="editorial-header">
        <p className="eyebrow">LE PETIT GUIDE PRATIQUE</p>
        <h1>
          Un peu de préparation.
          <br />
          <em>Puis beaucoup de jeu.</em>
        </h1>
        <p>
          Du premier tirage au rangement après l’atelier : les gestes simples
          pour préparer des supports qui vous ressemblent et qui durent.
        </p>
      </header>
      <div className="format-comparison">
        <article>
          <p className="eyebrow">ENVIE DE LE PRÉPARER VOUS-MÊME ?</p>
          <h2>
            Le PDF <span>5 €</span>
          </h2>
          <p>
            Les supports du kit et leur guide d’utilisation. Vous choisissez le
            papier, les éléments à imprimer et la façon de les protéger.
          </p>
        </article>
        <article>
          <p className="eyebrow">ENVIE DE SUPPORTS DÉJÀ PROTÉGÉS ?</p>
          <h2>
            Imprimé & plastifié <span>20 €</span>
          </h2>
          <p>
            Les supports imprimés et plastifiés pour être réutilisés, avec leur
            guide. Ajoutez les objets de jeu que vous avez déjà et installez
            votre univers.
          </p>
        </article>
      </div>
      <div className="guide-steps">
        {steps.map((s, i) => (
          <section key={s.title}>
            <div className="guide-step-index">
              <s.icon size={27} strokeWidth={1.3} />
              <span>0{i + 1}</span>
            </div>
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <aside>{s.tip}</aside>
            </div>
          </section>
        ))}
      </div>
      <section className="adult-note">
        <p className="eyebrow">ET POUR LANCER LE JEU ?</p>
        <h2>Montrez un échange. Laissez la suite venir.</h2>
        <p>
          Installez quelques supports, proposez les rôles, puis jouez une
          première scène. Introduisez une seule nouveauté à la fois. Une
          difficulté devient une question : « Comment pourrait-on faire ? »
        </p>
        <p>
          Les accessoires visibles sur les photos illustrent la mise en scène :
          dînette, sonnette, valise et objets de décoration ne font pas partie
          des supports du kit.
        </p>
        <Link className="button" href="/#les-kits">
          Choisir un univers <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
