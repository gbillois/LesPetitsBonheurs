# Au petit bonheur

Boutique de kits de jeux de rôle pour enfants. Application React / Vinext, en français, avec catalogue extensible et panier conservé dans le navigateur.

## Lancer le site

```sh
npm ci
npm run dev
```

Ouvrir l’adresse affichée par le serveur (habituellement http://localhost:3000).

```sh
npm run build
npx tsc --noEmit
npm test
```

## Hébergement

Le site n’est pas un dossier de fichiers HTML : les pages sont rendues à la demande par React Server Components, et la navigation interne (`next/link`) demande au serveur une charge utile RSC. Il n'y a donc pas d’`index.html` à publier, et GitHub Pages, qui ne sert que des fichiers statiques, ne peut pas faire tourner ce site. `npm run build` produit un Worker Cloudflare (`dist/server`) et ses fichiers d’accompagnement (`dist/client`).

### Publier sur Cloudflare Workers

```sh
npx wrangler login
npm run deploy
```

`npm run deploy` reconstruit le site puis le publie ; l’adresse `https://au-petit-bonheur.<sous-domaine>.workers.dev` est affichée à la fin. Le nom du Worker vient du champ `name` de `package.json`. Un domaine personnalisé s’ajoute dans le tableau de bord Cloudflare, sur le Worker, onglet Settings puis Domains & Routes.

Pour vérifier le rendu de production avant publication :

```sh
npm run build
npm start
```

### Publication automatique

`.github/workflows/deploy.yml` rejoue les vérifications puis publie à chaque `push` sur `main`. Deux secrets sont à créer dans le dépôt (Settings, Secrets and variables, Actions) :

- `CLOUDFLARE_API_TOKEN` : jeton créé sur https://dash.cloudflare.com/profile/api-tokens avec le modèle « Edit Cloudflare Workers ».
- `CLOUDFLARE_ACCOUNT_ID` : identifiant de compte visible dans le tableau de bord Cloudflare.

Si GitHub Pages est encore activé sur ce dépôt, le désactiver (Settings, Pages, Source : None) pour ne pas laisser en ligne une page vide.

## Organisation

- `lib/catalog.ts` : contenu des kits et tarifs, seule source de vérité du catalogue.
- `lib/cart.ts` : règles du panier et validation des données locales.
- `components/shop.tsx` : panier partagé, choix de format, navigation illustrée.
- `app/kits/[slug]/page.tsx` : fiche commune alimentée par le catalogue.
- `app/preparer-son-kit` et `app/en-classe` : guides d’usage.
- `public/images` : photos fournies et illustration originale de navigation.
- `docs/ajouter-un-kit.md` : ajouter le garage, l’hôpital ou un autre concept.

Le site n’encaisse rien et ne passe aucune commande. Les fichiers PDF vendables ne sont pas encore fournis ; il n’y a donc pas de faux téléchargement. Avant l’ouverture commerciale, connecter le paiement et la remise des fichiers, définir les modalités de livraison et compléter les informations commerciales avec les données réelles de l’activité.

Les trois images d’origine sont conservées à la racine. Elles portent l’ancienne appellation « Les Petits Bonheurs » ; l’interface utilise « Au petit bonheur ».
