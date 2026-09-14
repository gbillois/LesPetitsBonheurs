// Contenu des pages. Le catalogue reste la seule source de vérité : ajouter un
// kit dans assets/catalog.js suffit à créer sa fiche et à l’afficher partout.
import { formats, kits, money, shortMoney } from '../assets/catalog.js';
import { icon } from '../assets/icons.js';
import { cartContents } from '../assets/cart-view.js';

const streetNav = (url, exclude) => `<div class="street-nav">
          ${kits
            .filter((kit) => kit.id !== exclude)
            .map((kit) => {
              const illustration = kit.illustrationImage
                ? ` background-image: url(${url(kit.illustrationImage)}); background-size: contain;`
                : '';
              return `<a href="${url(`kits/${kit.id}/`)}">
            <span class="street-art" role="img" aria-label="Illustration de la devanture : ${kit.name}"
              style="background-position: ${kit.illustrationPosition} center;${illustration}"></span>
            <span>${kit.name} ${icon('arrow-right', 17)}</span>
          </a>`;
            })
            .join('\n          ')}
        </div>`;

export function home(url) {
  return `    <main id="contenu-principal">
      <section class="shop-window wrap" aria-labelledby="shop-title">
        <div class="shop-window-copy">
          <p class="eyebrow">KITS DE JEUX DE RÔLE POUR ENFANTS</p>
          <h1 id="shop-title">Tout pour jouer<br /><em>comme les grands.</em></h1>
          <p class="shop-explanation">
            Ouvrir un restaurant, accueillir les voyageurs d’un hôtel, organiser un spa : nos kits
            transforment un coin de salon ou de classe en terrain de jeu.
          </p>
          <p class="shop-contents">
            Menus, billets, réservations, affiches…<br />
            Les supports sont dans le kit. L’histoire est à eux.
          </p>
          <div class="shop-formats" aria-label="Les deux formats disponibles">
            <div><span>PDF à imprimer</span><strong>${money(formats.pdf.price)}</strong></div>
            <div><span>Imprimé &amp; plastifié</span><strong>${money(formats.printed.price)}</strong></div>
          </div>
          <p class="shop-guide-note">Guide de préparation et idées de jeu inclus.</p>
          <a href="#les-kits" class="button">Choisir un kit ${icon('arrow-right', 18)}</a>
        </div>
        <div class="shop-window-products">
          <div class="product-contact-sheet">
            ${kits
              .slice(0, 3)
              .map(
                (kit, index) => `<a href="${url(`kits/${kit.id}/`)}" class="window-kit${index === 0 ? ' window-kit-featured' : ''}">
              <img src="${url(kit.image)}" alt="Kit ${kit.name} : ses affiches, cartes et supports de jeu"
                width="1145" height="1374" fetchpriority="${index === 0 ? 'high' : 'auto'}" />
              <span><span>${kit.name}</span> ${icon('arrow-up-right', 17)}</span>
            </a>`,
              )
              .join('\n            ')}
          </div>
          <p class="window-caption">Les supports de nos kits, mis en scène. Accessoires non inclus.</p>
        </div>
      </section>
      <section class="catalog wrap section" id="les-kits">
        <div class="section-heading">
          <div>
            <p class="eyebrow">CHOISIR LEUR PROCHAIN JEU</p>
            <h2>Les kits, en détail.</h2>
          </div>
          <p class="catalog-intro">
            Menus, réservations, petits billets…<br />
            Les vrais détails font les grands jeux.
          </p>
        </div>
        <div class="kit-grid">
          ${kits
            .map(
              (kit) => `<a href="${url(`kits/${kit.id}/`)}" class="kit-card ${kit.id}">
            <div class="kit-photo">
              <img src="${url(kit.image)}" alt="Les éléments du kit ${kit.name}" loading="lazy" />
              <span class="kit-label">LE KIT À JOUER · ${kit.number}</span>
            </div>
            <div class="kit-title">
              <h3>${kit.name}</h3>
              ${icon('arrow-up-right', 26)}
            </div>
            <p>${kit.quote}</p>
            <p class="skills">${kit.skills}</p>
            <div class="kit-price">
              <span>PDF <b>${shortMoney(formats.pdf.price)}</b></span>
              <span>Imprimé &amp; plastifié <b>${shortMoney(formats.printed.price)}</b></span>
            </div>
          </a>`,
            )
            .join('\n          ')}
        </div>
      </section>
      <section class="pedagogy" id="pedagogie">
        <div class="wrap pedagogy-grid">
          <div>
            <p class="eyebrow">VU DE L’EXTÉRIEUR : ILS JOUENT.</p>
            <h2>En fait, il se passe<br /><em>tout ça.</em></h2>
            <p>
              Le serveur a oublié le jus. La chambre 102 est déjà prise. Le client préfère dire non.
              Dans ces petites histoires, on cherche les mots, on vérifie et on fait une place aux autres.
            </p>
            <a class="text-link" href="${url('en-classe/')}">Le coin des enseignants &amp; animateurs ${icon('arrow-up-right', 18)}</a>
          </div>
          <div class="learning-list">
            <article>
              <span>01</span>
              <div>
                <h3>« Tu peux me redire ? »</h3>
                <p>Écouter une commande, la reformuler et la transmettre. Le langage sert à faire avancer le jeu.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>« Il nous manque une assiette. »</h3>
                <p>Compter les convives, préparer les places, vérifier. Des quantités à comprendre avant des additions à réussir.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>« Maintenant, c’est toi qui accueilles. »</h3>
                <p>Essayer un autre rôle, entendre un refus, trouver un accord. Chaque enfant peut entrer dans l’histoire à sa façon.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section class="worktable wrap section">
        <div class="worktable-title">
          <p class="eyebrow">SUR LA TABLE DE PRÉPARATION</p>
          <h2>Du papier.<br />Des ciseaux.<br /><em>Et c’est parti.</em></h2>
          <a class="text-link" href="${url('preparer-son-kit/')}">Ouvrir le petit guide ${icon('arrow-up-right', 18)}</a>
        </div>
        <div class="preparation-ledger">
          <article>
            <span>01 / CHOISIR</span>
            <h3>À imprimer chez vous · ${shortMoney(formats.pdf.price)}</h3>
            <p>Le PDF du kit et ses instructions. Papier, découpage, installation : le guide vous accompagne.</p>
          </article>
          <article>
            <span>02 / OU SE SIMPLIFIER LA VIE</span>
            <h3>Imprimé &amp; plastifié · ${shortMoney(formats.printed.price)}</h3>
            <p>Les supports déjà imprimés et protégés, avec leur guide, pour les ateliers qui recommencent.</p>
          </article>
          <article>
            <span>03 / AJOUTER CE QUE VOUS AVEZ</span>
            <h3>La dînette, un coussin, les doudous.</h3>
            <p>Pas besoin de recréer la photo. Quelques objets du quotidien suffisent à installer leur univers.</p>
          </article>
        </div>
      </section>
      <section class="neighborhood-directory wrap" aria-label="Explorer les univers de jeu">
        <div>
          <p class="eyebrow">LE PETIT QUARTIER DES JEUX</p>
          <h2>Une autre histoire à essayer ?</h2>
        </div>
        ${streetNav(url)}
      </section>
      <aside class="next-addresses">
        <div class="wrap">
          <span>LE QUARTIER VA S’AGRANDIR.</span>
          <p>Un garage ? Un hôpital ?<br /><em>Il reste des histoires à ouvrir.</em></p>
          <span class="small-note">De nouveaux concepts à venir.</span>
        </div>
      </aside>
    </main>`;
}

export function kitPage(kit, url) {
  const purchase = `<div class="purchase" data-purchase>
            <p class="format-caption">Choisissez votre façon de jouer</p>
            <div class="format-options" role="radiogroup" aria-label="Format du kit">
              ${Object.entries(formats)
                .map(
                  ([key, format], index) => `<label class="format-option${index === 0 ? ' selected' : ''}">
                <input type="radio" name="format" value="${key}"${index === 0 ? ' checked' : ''} aria-label="${format.label}" />
                <span><b>${format.label}</b><small>${format.description}</small></span>
                <strong>${money(format.price)}</strong>
              </label>`,
                )
                .join('\n              ')}
            </div>
            <button type="button" class="button add-button" data-add data-kit="${kit.id}">
              ${icon('shopping-bag', 19)} Ajouter au panier <span>${money(formats.pdf.price)}</span>
            </button>
            <p class="purchase-note">${icon('check', 14)} Guide d’utilisation inclus dans les deux formats</p>
            <p class="small-note">Paiement à venir. Vous pouvez déjà préparer votre panier.</p>
          </div>`;

  return `    <main id="contenu-principal" class="product-page">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Fil d’Ariane">
          <a href="${url('')}">Accueil</a>
          <span>/</span>
          <a href="${url('#les-kits')}">Les kits</a>
          <span>/</span>
          <span>${kit.name}</span>
        </nav>
        <section class="product-hero">
          <figure class="product-picture">
            <a href="${url(kit.image)}" target="_blank" rel="noreferrer" aria-label="Voir le visuel complet de ${kit.name}">
              <img src="${url(kit.image)}" alt="Présentation des supports du kit ${kit.name}" />
              <span class="enlarge">${icon('move-up-right', 18)} Voir le visuel complet</span>
            </a>
            <figcaption>
              Visuel de présentation. Accessoires de mise en scène non inclus. Les visuels portent encore
              le nom « Les Petits Bonheurs ».
            </figcaption>
          </figure>
          <div class="product-intro">
            <p class="eyebrow">LES JEUX « COMME LES GRANDS » · N° ${kit.number}</p>
            <h1 style="color: ${kit.accent}">${kit.name}</h1>
            <h2>${kit.headline}</h2>
            <p>${kit.intro}</p>
            <div class="product-meta">
              <span>${icon('users', 16)} Dès 3 ans, accompagné</span>
              <span>${icon('clock-3', 16)} 15 à 40 min, à leur rythme</span>
            </div>
            ${purchase}
          </div>
        </section>
        <nav class="product-jumps" aria-label="Dans cette fiche">
          <a href="#contenu">Dans le kit</a>
          <a href="#jouer">Comment on joue</a>
          <a href="#apprentissages">Ce qu’on apprend</a>
          <a href="#adapter">À leur rythme</a>
        </nav>
        <section class="section kit-contents" id="contenu">
          <div class="section-heading">
            <div>
              <p class="eyebrow">LES SUPPORTS, ET CE QU’ON EN FAIT</p>
              <h2>Dans leur petit ${kit.shortName}.</h2>
            </div>
            <p class="contents-note">Les mêmes supports de jeu<br />dans les deux formats.</p>
          </div>
          <div class="contents-grid">
            ${kit.contents
              .map(
                (item, index) => `<article>
              <span class="item-number">${String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </div>
            </article>`,
              )
              .join('\n            ')}
          </div>
          <div class="materials">
            <b>À ajouter avec ce que vous avez déjà</b>
            <p>${kit.materials}</p>
          </div>
        </section>
      </div>
      <section class="play-section" id="jouer">
        <div class="wrap">
          <div class="play-header">
            <div>
              <p class="eyebrow">UNE PARTIE, PAS À PAS</p>
              <h2>Le décor est posé.<br />L’histoire peut commencer.</h2>
            </div>
            <div>
              <p>${kit.setup}</p>
              <div class="roles">${kit.roles.map((role) => `<span>${role}</span>`).join('')}</div>
            </div>
          </div>
          <ol class="play-steps">
            ${kit.steps
              .map(
                (step, index) => `<li>
              <span>${String(index + 1).padStart(2, '0')}</span>
              <h3>${step.title}</h3>
              <p>${step.text}</p>
            </li>`,
              )
              .join('\n            ')}
          </ol>
          ${
            kit.care
              ? `<aside class="care">
            <b>Au spa, on fait semblant et on respecte les choix.</b>
            <p>${kit.care}</p>
          </aside>`
              : ''
          }
        </div>
      </section>
      <div class="wrap">
        <section class="section kit-learning" id="apprentissages">
          <div>
            <p class="eyebrow">REGARDER CE QUI SE PASSE DANS LE JEU</p>
            <h2>Des apprentissages<br />qui se voient.</h2>
            <p>
              Pas de bonne réponse à réciter. L’enfant essaie, échange, recommence. L’adulte accompagne
              sans écrire l’histoire à sa place.
            </p>
          </div>
          <div>
            ${kit.learning
              .map(
                (item, index) => `<article>
              <span>${index + 1}.</span>
              <div>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </div>
            </article>`,
              )
              .join('\n            ')}
          </div>
        </section>
        <section class="section adaptations" id="adapter">
          <p class="eyebrow">LE MÊME KIT, DES HISTOIRES QUI ÉVOLUENT</p>
          <h2>On joue avec ce qu’on sait déjà.</h2>
          <p class="adaptation-intro">
            Ces âges sont des repères, pas des prérequis. On peut montrer, dessiner ou dicter : savoir
            lire n’est pas nécessaire pour commencer.
          </p>
          <div class="age-grid">
            ${kit.ages
              .map(
                (age) => `<article>
              <h3>${age.age}</h3>
              <p>${age.text}</p>
            </article>`,
              )
              .join('\n            ')}
          </div>
          <div class="context-grid">
            <article>
              <p class="eyebrow">À LA MAISON</p>
              <h3>Une place dans le quotidien.</h3>
              <p>${kit.home}</p>
            </article>
            <article>
              <p class="eyebrow">EN CLASSE OU EN ATELIER</p>
              <h3>Un petit groupe, plusieurs rôles.</h3>
              <p>${kit.classroom}</p>
              <a class="text-link" href="${url('en-classe/')}">Préparer une séance ${icon('arrow-up-right', 16)}</a>
            </article>
          </div>
          <blockquote>
            <span>LA PETITE QUESTION APRÈS LE JEU</span>« ${kit.question} »
          </blockquote>
        </section>
        <section class="guide-callout">
          <div>
            <p class="eyebrow">IMPRIMER · DÉCOUPER · REJOUER</p>
            <h2>On vous aide à préparer le kit.</h2>
          </div>
          <a class="button outline" href="${url('preparer-son-kit/')}">Lire le petit guide ${icon('arrow-right', 17)}</a>
        </section>
        <section class="section other-kits">
          <p class="eyebrow">UNE AUTRE PORTE À POUSSER</p>
          <h2>Le quartier ne s’arrête pas là.</h2>
          ${streetNav(url, kit.id)}
        </section>
      </div>
    </main>`;
}

export function cartPage(url) {
  return `    <main id="contenu-principal" class="wrap cart-page">
      <p class="eyebrow">VOS PROCHAINES HISTOIRES</p>
      <h1>Votre petit panier</h1>
      ${cartContents(url)}
    </main>`;
}

const guideSteps = [
  {
    icon: 'printer',
    title: 'Imprimer sans mauvaise surprise',
    text: 'Choisissez le format A4, la taille réelle (100 %) et la qualité élevée en couleur. Vérifiez l’aperçu et imprimez une page test avant de lancer tout le kit. Si un bord est coupé, adaptez la mise à l’échelle à la zone imprimable.',
    tip: 'Pour des cartes plus solides : du papier 160 à 200 g/m², si votre imprimante l’accepte. Le papier standard convient aussi, notamment avant plastification.',
  },
  {
    icon: 'scissors',
    title: 'Découper et préparer les pièces',
    text: 'Découpez les supports selon leurs contours. L’adulte prépare les petites pièces et les découpes délicates. Les enfants peuvent participer selon leur aisance, avec des ciseaux adaptés.',
    tip: 'Gardez les affiches et tableaux entiers. Réunissez les cartes d’un même rôle avant de commencer à jouer.',
  },
  {
    icon: 'layers',
    title: 'Protéger pour recommencer',
    text: 'Pour plastifier, suivez les consignes de l’appareil, manipulé par un adulte. Après plastification, conservez un bord scellé autour de chaque pièce et arrondissez les angles.',
    tip: 'Sans plastifieuse, glissez les tableaux dans des pochettes transparentes. Pour écrire puis effacer, testez un feutre compatible dans un petit coin.',
  },
  {
    icon: 'folder-heart',
    title: 'Ranger pour la prochaine histoire',
    text: 'Classez les supports par usage : accueil, commandes ou rendez-vous, monnaie. Rangez les petits éléments dans des pochettes et les affiches à plat.',
    tip: 'Sur les surfaces plastifiées, utilisez un chiffon doux légèrement humide. Laissez sécher avant le rangement ; évitez chaleur et produits abrasifs.',
  },
];

export function guidePage(url) {
  return `    <main id="contenu-principal" class="wrap guide-page">
      <nav class="breadcrumb" aria-label="Fil d’Ariane">
        <a href="${url('')}">Accueil</a>
        <span>/</span>
        <span>Le petit guide</span>
      </nav>
      <header class="editorial-header">
        <p class="eyebrow">LE PETIT GUIDE PRATIQUE</p>
        <h1>Un peu de préparation.<br /><em>Puis beaucoup de jeu.</em></h1>
        <p>
          Du premier tirage au rangement après l’atelier : les gestes simples pour préparer des supports
          qui vous ressemblent et qui durent.
        </p>
      </header>
      <div class="format-comparison">
        <article>
          <p class="eyebrow">ENVIE DE LE PRÉPARER VOUS-MÊME ?</p>
          <h2>Le PDF <span>${shortMoney(formats.pdf.price)}</span></h2>
          <p>
            Les supports du kit et leur guide d’utilisation. Vous choisissez le papier, les éléments à
            imprimer et la façon de les protéger.
          </p>
        </article>
        <article>
          <p class="eyebrow">ENVIE DE SUPPORTS DÉJÀ PROTÉGÉS ?</p>
          <h2>Imprimé &amp; plastifié <span>${shortMoney(formats.printed.price)}</span></h2>
          <p>
            Les supports imprimés et plastifiés pour être réutilisés, avec leur guide. Ajoutez les objets
            de jeu que vous avez déjà et installez votre univers.
          </p>
        </article>
      </div>
      <div class="guide-steps">
        ${guideSteps
          .map(
            (step, index) => `<section>
          <div class="guide-step-index">
            ${icon(step.icon, 27, { strokeWidth: 1.3 })}
            <span>0${index + 1}</span>
          </div>
          <div>
            <h2>${step.title}</h2>
            <p>${step.text}</p>
            <aside>${step.tip}</aside>
          </div>
        </section>`,
          )
          .join('\n        ')}
      </div>
      <section class="adult-note">
        <p class="eyebrow">ET POUR LANCER LE JEU ?</p>
        <h2>Montrez un échange. Laissez la suite venir.</h2>
        <p>
          Installez quelques supports, proposez les rôles, puis jouez une première scène. Introduisez une
          seule nouveauté à la fois. Une difficulté devient une question : « Comment pourrait-on faire ? »
        </p>
        <p>
          Les accessoires visibles sur les photos illustrent la mise en scène : dînette, sonnette, valise
          et objets de décoration ne font pas partie des supports du kit.
        </p>
        <a class="button" href="${url('#les-kits')}">Choisir un univers ${icon('arrow-right', 18)}</a>
      </section>
    </main>`;
}

export function classroomPage(url) {
  return `    <main id="contenu-principal" class="wrap classroom-page">
      <nav class="breadcrumb" aria-label="Fil d’Ariane">
        <a href="${url('')}">Accueil</a>
        <span>/</span>
        <span>Pour la classe</span>
      </nav>
      <header class="editorial-header">
        <p class="eyebrow">POUR LES ENSEIGNANTS ET LES ANIMATEURS</p>
        <h1>Un coin de classe.<br /><em>Un monde à faire vivre.</em></h1>
        <p>
          Des supports de jeu symbolique pour créer des situations où les enfants ont besoin de se parler,
          d’organiser leurs idées et d’agir ensemble.
        </p>
      </header>
      <section class="class-plan">
        <div>
          <p class="eyebrow">UNE SÉANCE À ADAPTER À VOTRE GROUPE</p>
          <h2>Ouvrir, jouer,<br />échanger.</h2>
          <p>
            Repère proposé : 20 à 35 minutes avec 3 à 6 enfants. Réduisez les rôles, les supports ou la
            durée selon l’attention et les besoins du groupe.
          </p>
        </div>
        <ol>
          <li>
            <span>5 min</span>
            <div>
              <h3>Installer ensemble</h3>
              <p>
                Présentez quelques supports et faites nommer leur fonction. Laissez les enfants choisir
                les rôles. Tous les rôles sont ouverts à tous.
              </p>
            </div>
          </li>
          <li>
            <span>10–20 min</span>
            <div>
              <h3>Laisser vivre le scénario</h3>
              <p>
                Modélisez un premier échange, puis prenez du recul. Si nécessaire, proposez un petit
                problème à résoudre. Faites tourner les rôles à la fin d’une scène.
              </p>
            </div>
          </li>
          <li>
            <span>5–10 min</span>
            <div>
              <h3>Revenir sur une expérience</h3>
              <p>
                Demandez comment le groupe a retenu une information ou trouvé une solution. Rangez les
                supports par rôle pour la prochaine équipe.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <section class="observation">
        <p class="eyebrow">UNE INTENTION À LA FOIS</p>
        <h2>Observer, sans interrompre l’histoire.</h2>
        <div class="observation-table">
          <table>
            <caption>Exemples d’observations pendant le jeu</caption>
            <thead>
              <tr>
                <th scope="col">Dans le jeu</th>
                <th scope="col">Ce que vous pouvez observer</th>
                <th scope="col">Une relance possible</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Au restaurant</td>
                <td>L’enfant reformule une commande et vérifie une quantité.</td>
                <td>« Comment vas-tu te souvenir de tout ? »</td>
              </tr>
              <tr>
                <td>À l’hôtel</td>
                <td>L’enfant s’appuie sur le planning pour proposer une chambre libre.</td>
                <td>« Comment peux-tu vérifier ? »</td>
              </tr>
              <tr>
                <td>Au spa</td>
                <td>L’enfant demande le choix de l’autre et respecte un refus.</td>
                <td>« Qu’est-ce qu’il ou elle préfère ? »</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div class="context-grid">
        <article>
          <p class="eyebrow">RENDRE LE JEU ACCESSIBLE</p>
          <h3>Plusieurs façons de participer.</h3>
          <p>
            Réduisez le nombre de choix, montrez les supports, associez une couleur à un espace et
            acceptez les réponses dessinées, montrées ou dictées. Un enfant peut d’abord observer ou
            jouer en binôme.
          </p>
        </article>
        <article>
          <p class="eyebrow">PRÉPARER UN ESPACE AUTONOME</p>
          <h3>Moins de matériel, plus de repères.</h3>
          <p>
            Commencez avec trois ou quatre supports. Rangez-les dans des pochettes identifiées par rôle.
            Ajoutez une nouveauté lorsque le scénario devient familier ; gardez une place pour les idées
            des enfants.
          </p>
        </article>
      </div>
      <section class="source-note">
        <h3>Pourquoi le jeu symbolique ?</h3>
        <p>
          Il donne l’occasion d’essayer des rôles, de négocier une histoire et d’utiliser le langage dans
          une situation qui a du sens. Le jeu symbolique fait partie des modalités d’apprentissage
          proposées à l’école maternelle.
        </p>
        <a class="text-link" href="https://eduscol.education.gouv.fr/4689/jouer-et-apprendre-au-cycle-1" target="_blank" rel="noreferrer">
          Lire « Jouer et apprendre au cycle 1 » sur Éduscol ↗
        </a>
        <p class="small-note">
          Les pistes proposées ici sont des suggestions d’animation à adapter à votre groupe, sans
          validation institutionnelle revendiquée pour les kits.
        </p>
      </section>
      <section class="section">
        <p class="eyebrow">QUEL ESPACE OUVREZ-VOUS EN PREMIER ?</p>
        ${streetNav(url)}
      </section>
    </main>`;
}

export function notFoundPage(url) {
  return `    <main id="contenu-principal" class="wrap editorial-header">
      <p class="eyebrow">CETTE PORTE N’EST PAS ENCORE OUVERTE</p>
      <h1>Ce kit est introuvable.</h1>
      <p>Retrouvez les univers disponibles dans la collection.</p>
      <a href="${url('#les-kits')}" class="button">Voir les kits</a>
    </main>`;
}
