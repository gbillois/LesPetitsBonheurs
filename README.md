# Au petit bonheur

Boutique de kits de jeux de rôle pour enfants. Site statique en français, sans dépendance, avec un catalogue extensible et un panier conservé dans le navigateur.

## Voir le site en local

```sh
npm run build
npm start
```

`npm start` affiche l’adresse à ouvrir. Elle reprend le chemin public du site (`/LesPetitsBonheurs/`) pour que la prévisualisation se comporte exactement comme GitHub Pages, page 404 comprise.

```sh
npm test
```

Les tests vérifient les règles du panier et que les pages HTML publiées correspondent bien au catalogue.

## Hébergement

Le site est un ensemble de fichiers HTML, CSS, JavaScript et images, publiés à la racine du dépôt. GitHub Pages les sert tels quels.

Réglage à faire une seule fois, dans Settings puis Pages : **Source : Deploy from a branch**, branche `main`, dossier `/ (root)`. Chaque `push` sur `main` met le site en ligne, sur `https://gbillois.github.io/LesPetitsBonheurs/`.

Rien n’est compilé au moment de la publication : les pages présentes dans le dépôt sont celles qui sont servies. Après toute modification du contenu, **relancer `npm run build` et committer les fichiers HTML modifiés**. Le test « les pages publiées sont à jour » échoue si cet oubli se produit.

### Chemin public et domaine personnalisé

Tous les liens et toutes les ressources sont relatifs, sauf sur `404.html` : cette page pouvant être servie depuis n’importe quelle adresse, elle a besoin du chemin public du site. Il est défini dans `scripts/site-base.mjs` et vaut `/LesPetitsBonheurs/`.

Avec un domaine personnalisé, ou si le dépôt devient `gbillois.github.io`, le site est servi à la racine : régénérer avec `node scripts/build.mjs --base /` et adapter la valeur par défaut dans `scripts/site-base.mjs`.

L’année du pied de page est écrite au moment de la génération. Au 1er janvier, relancer `npm run build`.

## Organisation

- `index.html`, `kits/`, `panier/`, `preparer-son-kit/`, `en-classe/`, `404.html` : les pages publiées, **générées**. Ne pas les modifier à la main.
- `assets/catalog.js` : contenu des kits et tarifs, seule source de vérité du catalogue.
- `assets/cart.js` : règles du panier et validation des données locales.
- `assets/cart-view.js` : affichage du panier, partagé par le générateur et le navigateur.
- `assets/site.js` : panier local, tiroir latéral, choix du format.
- `assets/site.css` : toute la mise en forme, polices auto-hébergées comprises.
- `assets/icons.js` : icônes Lucide figées en données.
- `scripts/build.mjs`, `scripts/layout.mjs`, `scripts/pages.mjs` : le générateur de pages.
- `scripts/serve.mjs` : serveur de prévisualisation local.
- `images/` : photos fournies et illustration originale de navigation.
- `docs/ajouter-un-kit.md` : ajouter le garage, l’hôpital ou un autre concept.

Le site n’encaisse rien et ne passe aucune commande. Les fichiers PDF vendables ne sont pas encore fournis ; il n’y a donc pas de faux téléchargement. Avant l’ouverture commerciale, connecter le paiement et la remise des fichiers, définir les modalités de livraison et compléter les informations commerciales avec les données réelles de l’activité.

Les visuels portent l’ancienne appellation « Les Petits Bonheurs » ; l’interface utilise « Au petit bonheur ».
