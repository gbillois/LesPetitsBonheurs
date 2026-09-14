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
