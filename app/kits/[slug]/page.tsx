import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Users,
  MoveUpRight,
} from 'lucide-react';
import { kits, getKit } from '@/lib/catalog';
import { Purchase, StreetNav } from '@/components/shop';
export function generateStaticParams() {
  return kits.map((k) => ({ slug: k.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKit(slug);
  return {
    title: kit
      ? `${kit.name} — Kit de jeu | Au petit bonheur`
      : 'Kit introuvable',
    description: kit?.intro,
  };
}
export default async function KitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kit = getKit(slug);
  if (!kit) notFound();
  return (
    <main id="contenu-principal" className="product-page">
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/#les-kits">Les kits</Link>
          <span>/</span>
          <span>{kit.name}</span>
        </nav>
        <section className="product-hero">
          <figure className="product-picture">
            <a
              href={kit.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`Voir le visuel complet de ${kit.name}`}
            >
              <img
                src={kit.image}
                alt={`Présentation des supports du kit ${kit.name}`}
              />
              <span className="enlarge">
                <MoveUpRight size={18} /> Voir le visuel complet
              </span>
            </a>
            <figcaption>
              Visuel de présentation. Accessoires de mise en scène non inclus.
              Les visuels portent encore le nom « Les Petits Bonheurs ».
            </figcaption>
          </figure>
          <div className="product-intro">
            <p className="eyebrow">
              LES JEUX « COMME LES GRANDS » · N° {kit.number}
            </p>
            <h1 style={{ color: kit.accent }}>{kit.name}</h1>
            <h2>{kit.headline}</h2>
            <p>{kit.intro}</p>
            <div className="product-meta">
              <span>
                <Users size={16} /> Dès 3 ans, accompagné
              </span>
              <span>
                <Clock3 size={16} /> 15 à 40 min, à leur rythme
              </span>
            </div>
            <Purchase kit={kit} />
          </div>
        </section>
        <nav className="product-jumps" aria-label="Dans cette fiche">
          <a href="#contenu">Dans le kit</a>
          <a href="#jouer">Comment on joue</a>
          <a href="#apprentissages">Ce qu’on apprend</a>
          <a href="#adapter">À leur rythme</a>
        </nav>
        <section className="section kit-contents" id="contenu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LES SUPPORTS, ET CE QU’ON EN FAIT</p>
              <h2>Dans leur petit {kit.shortName}.</h2>
            </div>
            <p className="contents-note">
              Les mêmes supports de jeu
              <br />
              dans les deux formats.
            </p>
          </div>
          <div className="contents-grid">
            {kit.contents.map((item, i) => (
              <article key={item.title}>
                <span className="item-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="materials">
            <b>À ajouter avec ce que vous avez déjà</b>
            <p>{kit.materials}</p>
          </div>
        </section>
      </div>
      <section className="play-section" id="jouer">
        <div className="wrap">
          <div className="play-header">
            <div>
              <p className="eyebrow">UNE PARTIE, PAS À PAS</p>
              <h2>
                Le décor est posé.
                <br />
                L’histoire peut commencer.
              </h2>
            </div>
            <div>
              <p>{kit.setup}</p>
              <div className="roles">
                {kit.roles.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
            </div>
          </div>
          <ol className="play-steps">
            {kit.steps.map((step, i) => (
              <li key={step.title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          {kit.care && (
            <aside className="care">
              <b>Au spa, on fait semblant et on respecte les choix.</b>
              <p>{kit.care}</p>
            </aside>
          )}
        </div>
      </section>
      <div className="wrap">
        <section className="section kit-learning" id="apprentissages">
          <div>
            <p className="eyebrow">REGARDER CE QUI SE PASSE DANS LE JEU</p>
            <h2>
              Des apprentissages
              <br />
              qui se voient.
            </h2>
            <p>
              Pas de bonne réponse à réciter. L’enfant essaie, échange,
              recommence. L’adulte accompagne sans écrire l’histoire à sa place.
            </p>
          </div>
          <div>
            {kit.learning.map((item, i) => (
              <article key={item.title}>
                <span>{i + 1}.</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section adaptations" id="adapter">
          <p className="eyebrow">LE MÊME KIT, DES HISTOIRES QUI ÉVOLUENT</p>
          <h2>On joue avec ce qu’on sait déjà.</h2>
          <p className="adaptation-intro">
            Ces âges sont des repères, pas des prérequis. On peut montrer,
            dessiner ou dicter : savoir lire n’est pas nécessaire pour
            commencer.
          </p>
          <div className="age-grid">
            {kit.ages.map((a) => (
              <article key={a.age}>
                <h3>{a.age}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
          <div className="context-grid">
            <article>
              <p className="eyebrow">À LA MAISON</p>
              <h3>Une place dans le quotidien.</h3>
              <p>{kit.home}</p>
            </article>
            <article>
              <p className="eyebrow">EN CLASSE OU EN ATELIER</p>
              <h3>Un petit groupe, plusieurs rôles.</h3>
              <p>{kit.classroom}</p>
              <Link className="text-link" href="/en-classe">
                Préparer une séance <ArrowUpRight size={16} />
              </Link>
            </article>
          </div>
          <blockquote>
            <span>LA PETITE QUESTION APRÈS LE JEU</span>« {kit.question} »
          </blockquote>
        </section>
        <section className="guide-callout">
          <div>
            <p className="eyebrow">IMPRIMER · DÉCOUPER · REJOUER</p>
            <h2>On vous aide à préparer le kit.</h2>
          </div>
          <Link className="button outline" href="/preparer-son-kit">
            Lire le petit guide <ArrowRight size={17} />
          </Link>
        </section>
        <section className="section other-kits">
          <p className="eyebrow">UNE AUTRE PORTE À POUSSER</p>
          <h2>Le quartier ne s’arrête pas là.</h2>
          <StreetNav exclude={kit.id} />
        </section>
      </div>
    </main>
  );
}
