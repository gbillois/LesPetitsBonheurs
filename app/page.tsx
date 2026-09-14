import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { kits } from '@/lib/catalog';
import { StreetNav } from '@/components/shop';
export default function Home() {
  return (
    <main id="contenu-principal">
      <section className="neighborhood wrap">
        <div className="neighborhood-heading">
          <div>
            <p className="eyebrow">BIENVENUE AU PETIT BONHEUR</p>
            <h1>
              Aujourd’hui,
              <br />
              on ouvre <em>quoi ?</em>
            </h1>
          </div>
          <div className="neighborhood-intro">
            <p>
              Le restaurant du salon.
              <br />
              L’hôtel des doudous.
              <br />
              Le spa du mercredi.
            </p>
            <p>
              Des décors à imprimer, des rôles à essayer.
              <br />
              La suite, c’est eux qui l’inventent.
            </p>
            <a href="#les-kits" className="text-link">
              Les kits, à partir de 5 € <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <StreetNav />
        <div className="street-caption">
          <span>CHOISISSEZ UNE PORTE. L’HISTOIRE COMMENCE.</span>
          <span>À la maison · En classe · En atelier</span>
        </div>
      </section>
      <section className="catalog wrap section" id="les-kits">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DERRIÈRE CHAQUE PORTE, UN KIT</p>
            <h2>De quoi faire comme les grands.</h2>
          </div>
          <p className="catalog-intro">
            Menus, réservations, petits billets…
            <br />
            Les vrais détails font les grands jeux.
          </p>
        </div>
        <div className="kit-grid">
          {kits.map((k) => (
            <Link
              href={`/kits/${k.id}`}
              className={`kit-card ${k.id}`}
              key={k.id}
            >
              <div className="kit-photo">
                <img
                  src={k.image}
                  alt={`Les éléments du kit ${k.name}`}
                  loading="lazy"
                />
                <span className="kit-label">LE KIT À JOUER · {k.number}</span>
              </div>
              <div className="kit-title">
                <h3>{k.name}</h3>
                <ArrowUpRight size={26} />
              </div>
              <p>{k.quote}</p>
              <p className="skills">{k.skills}</p>
              <div className="kit-price">
                <span>
                  PDF <b>5 €</b>
                </span>
                <span>
                  Imprimé & plastifié <b>20 €</b>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="pedagogy" id="pedagogie">
        <div className="wrap pedagogy-grid">
          <div>
            <p className="eyebrow">VU DE L’EXTÉRIEUR : ILS JOUENT.</p>
            <h2>
              En fait, il se passe
              <br />
              <em>tout ça.</em>
            </h2>
            <p>
              Le serveur a oublié le jus. La chambre 102 est déjà prise. Le
              client préfère dire non. Dans ces petites histoires, on cherche
              les mots, on vérifie et on fait une place aux autres.
            </p>
            <Link className="text-link" href="/en-classe">
              Le coin des enseignants & animateurs <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="learning-list">
            <article>
              <span>01</span>
              <div>
                <h3>« Tu peux me redire ? »</h3>
                <p>
                  Écouter une commande, la reformuler et la transmettre. Le
                  langage sert à faire avancer le jeu.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>« Il nous manque une assiette. »</h3>
                <p>
                  Compter les convives, préparer les places, vérifier. Des
                  quantités à comprendre avant des additions à réussir.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>« Maintenant, c’est toi qui accueilles. »</h3>
                <p>
                  Essayer un autre rôle, entendre un refus, trouver un accord.
                  Chaque enfant peut entrer dans l’histoire à sa façon.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="worktable wrap section">
        <div className="worktable-title">
          <p className="eyebrow">SUR LA TABLE DE PRÉPARATION</p>
          <h2>
            Du papier.
            <br />
            Des ciseaux.
            <br />
            <em>Et c’est parti.</em>
          </h2>
          <Link className="text-link" href="/preparer-son-kit">
            Ouvrir le petit guide <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="preparation-ledger">
          <article>
            <span>01 / CHOISIR</span>
            <h3>À imprimer chez vous · 5 €</h3>
            <p>
              Le PDF du kit et ses instructions. Papier, découpage, installation
              : le guide vous accompagne.
            </p>
          </article>
          <article>
            <span>02 / OU SE SIMPLIFIER LA VIE</span>
            <h3>Imprimé & plastifié · 20 €</h3>
            <p>
              Les supports déjà imprimés et protégés, avec leur guide, pour les
              ateliers qui recommencent.
            </p>
          </article>
          <article>
            <span>03 / AJOUTER CE QUE VOUS AVEZ</span>
            <h3>La dînette, un coussin, les doudous.</h3>
            <p>
              Pas besoin de recréer la photo. Quelques objets du quotidien
              suffisent à installer leur univers.
            </p>
          </article>
        </div>
      </section>
      <aside className="next-addresses">
        <div className="wrap">
          <span>LE QUARTIER VA S’AGRANDIR.</span>
          <p>
            Un garage ? Un hôpital ?<br />
            <em>Il reste des histoires à ouvrir.</em>
          </p>
          <span className="small-note">De nouveaux concepts à venir.</span>
        </div>
      </aside>
    </main>
  );
}
