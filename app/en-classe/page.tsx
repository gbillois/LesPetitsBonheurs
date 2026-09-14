import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import Link from 'next/link';
import type { Metadata } from 'next';
import { StreetNav } from '@/components/shop';
export const metadata: Metadata = {
  title: 'Les kits en classe et en atelier | Au petit bonheur',
  description:
    'Installer un espace de jeu symbolique, faire tourner les rôles et observer des apprentissages concrets en petits groupes.',
};
export default function Classroom() {
  return (
    <main id="contenu-principal" className="wrap classroom-page">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span>Pour la classe</span>
      </nav>
      <header className="editorial-header">
        <p className="eyebrow">POUR LES ENSEIGNANTS ET LES ANIMATEURS</p>
        <h1>
          Un coin de classe.
          <br />
          <em>Un monde à faire vivre.</em>
        </h1>
        <p>
          Des supports de jeu symbolique pour créer des situations où les
          enfants ont besoin de se parler, d’organiser leurs idées et d’agir
          ensemble.
        </p>
      </header>
      <section className="class-plan">
        <div>
          <p className="eyebrow">UNE SÉANCE À ADAPTER À VOTRE GROUPE</p>
          <h2>
            Ouvrir, jouer,
            <br />
            échanger.
          </h2>
          <p>
            Repère proposé : 20 à 35 minutes avec 3 à 6 enfants. Réduisez les
            rôles, les supports ou la durée selon l’attention et les besoins du
            groupe.
          </p>
        </div>
        <ol>
          <li>
            <span>5 min</span>
            <div>
              <h3>Installer ensemble</h3>
              <p>
                Présentez quelques supports et faites nommer leur fonction.
                Laissez les enfants choisir les rôles. Tous les rôles sont
                ouverts à tous.
              </p>
            </div>
          </li>
          <li>
            <span>10–20 min</span>
            <div>
              <h3>Laisser vivre le scénario</h3>
              <p>
                Modélisez un premier échange, puis prenez du recul. Si
                nécessaire, proposez un petit problème à résoudre. Faites
                tourner les rôles à la fin d’une scène.
              </p>
            </div>
          </li>
          <li>
            <span>5–10 min</span>
            <div>
              <h3>Revenir sur une expérience</h3>
              <p>
                Demandez comment le groupe a retenu une information ou trouvé
                une solution. Rangez les supports par rôle pour la prochaine
                équipe.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <section className="observation">
        <p className="eyebrow">UNE INTENTION À LA FOIS</p>
        <h2>Observer, sans interrompre l’histoire.</h2>
        <div className="observation-table">
          <Table>
            <TableCaption>Exemples d’observations pendant le jeu</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Dans le jeu</TableHead>
                <TableHead>Ce que vous pouvez observer</TableHead>
                <TableHead>Une relance possible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Au restaurant</TableCell>
                <TableCell>
                  L’enfant reformule une commande et vérifie une quantité.
                </TableCell>
                <TableCell>« Comment vas-tu te souvenir de tout ? »</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>À l’hôtel</TableCell>
                <TableCell>
                  L’enfant s’appuie sur le planning pour proposer une chambre
                  libre.
                </TableCell>
                <TableCell>« Comment peux-tu vérifier ? »</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Au spa</TableCell>
                <TableCell>
                  L’enfant demande le choix de l’autre et respecte un refus.
                </TableCell>
                <TableCell>« Qu’est-ce qu’il ou elle préfère ? »</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
      <div className="context-grid">
        <article>
          <p className="eyebrow">RENDRE LE JEU ACCESSIBLE</p>
          <h3>Plusieurs façons de participer.</h3>
          <p>
            Réduisez le nombre de choix, montrez les supports, associez une
            couleur à un espace et acceptez les réponses dessinées, montrées ou
            dictées. Un enfant peut d’abord observer ou jouer en binôme.
          </p>
        </article>
        <article>
          <p className="eyebrow">PRÉPARER UN ESPACE AUTONOME</p>
          <h3>Moins de matériel, plus de repères.</h3>
          <p>
            Commencez avec trois ou quatre supports. Rangez-les dans des
            pochettes identifiées par rôle. Ajoutez une nouveauté lorsque le
            scénario devient familier ; gardez une place pour les idées des
            enfants.
          </p>
        </article>
      </div>
      <section className="source-note">
        <h3>Pourquoi le jeu symbolique ?</h3>
        <p>
          Il donne l’occasion d’essayer des rôles, de négocier une histoire et
          d’utiliser le langage dans une situation qui a du sens. Le jeu
          symbolique fait partie des modalités d’apprentissage proposées à
          l’école maternelle.
        </p>
        <a
          className="text-link"
          href="https://eduscol.education.gouv.fr/4689/jouer-et-apprendre-au-cycle-1"
          target="_blank"
          rel="noreferrer"
        >
          Lire « Jouer et apprendre au cycle 1 » sur Éduscol ↗
        </a>
        <p className="small-note">
          Les pistes proposées ici sont des suggestions d’animation à adapter à
          votre groupe, sans validation institutionnelle revendiquée pour les
          kits.
        </p>
      </section>
      <section className="section">
        <p className="eyebrow">QUEL ESPACE OUVREZ-VOUS EN PREMIER ?</p>
        <StreetNav />
      </section>
    </main>
  );
}
