# Ajouter un univers

Le catalogue n’est pas limité au restaurant, à l’hôtel ou au spa. Les pages, le panier et la navigation sont construits à partir de `kits` dans `lib/catalog.ts`.

1. Ajouter la photo dans `public/images`.
2. Ajouter une entrée `Kit` à `kits` avec un `id` unique et stable (par exemple `garage` ou `hopital`). L’URL est automatiquement `/kits/<id>`.
3. Renseigner le nom, `shortName` (nom sans article), la phrase de jeu `quote`, les supports réellement inclus, les rôles, les étapes, les apprentissages observables, les adaptations et les usages maison/classe.
4. Ajouter une illustration indépendante avec `illustrationImage: '/images/garage-navigation.png'` et `illustrationPosition: '50%'`. Les trois premiers kits partagent une planche ; les suivants peuvent avoir leur propre visuel sans modifier le composant.
5. Choisir `accent` pour la couleur du titre et un numéro d’édition pour `number`.
6. Lancer les vérifications indiquées dans le README.

Les nouveaux kits apparaissent automatiquement dans la collection, dans la rue illustrée et parmi les autres univers des fiches. La rue passe à la ligne pour accueillir plus de concepts. Les routes et les paniers utilisent l’identifiant stable, pas le nom du kit.

Les tarifs sont centralisés dans `formats` : PDF 500 centimes, imprimé/plastifié 2 000 centimes. Les descriptions et totaux du panier réutilisent cette source. Pour changer les prix à l’avenir, adapter aussi les textes éditoriaux de l’accueil et du guide.

Un PDF ne se duplique pas dans le panier. Les exemplaires imprimés se cumulent, dans la limite de 99 par ligne. Les deux formats du même univers peuvent coexister. Le stockage est local au navigateur : aucune commande n’est enregistrée côté serveur.

Pour un futur hôpital, décrire le jeu symbolique et l’accueil, sans présenter des gestes médicaux comme des activités à réaliser réellement. Définir un cadre spécifique dans `care`, comme pour le spa.

## Illustration de navigation

`public/images/la-rue-des-jeux.png` a été créée avec l’outil intégré image_gen. Prompt : illustration panoramique 3:1 de trois devantures en papier découpé, restaurant rouge tomate à store rayé, hôtel vert sapin avec clé jaune, spa rose grès avec fleur, style gouache/crayon éditorial jeunesse, fond crème, sans texte, lettres, interface ou personnages. L’original est livré dans le dépôt.

## Points restant pour l’ouverture commerciale

Les PDF finaux, les éléments de livraison et les informations administratives de la marque doivent être fournis avant activation des ventes. Le bouton de paiement reste désactivé en attendant une intégration réelle ; ne jamais traiter le prix du navigateur comme source de vérité pour un paiement serveur.

WebMCP expose `read_kit_catalog`, `read_cart` et `stage_kit_in_cart` dans les navigateurs compatibles, sur le même état que l’interface. La validation dans un contexte WebMCP réel n’a pas été effectuée dans cet environnement ; ce support reste facultatif.
