// Catalogue : seule source de vérité des kits, des formats et des tarifs.
// Utilisé à la fois par le générateur de pages et par le panier du navigateur.
export const formats = {
  pdf: {
    label: 'PDF à imprimer',
    price: 500,
    description:
      'Les supports du jeu + le guide pour préparer et animer votre atelier.',
  },
  printed: {
    label: 'Imprimé & plastifié',
    price: 2000,
    description:
      'Les supports imprimés et protégés pour rejouer, avec le guide d’utilisation.',
  },
};
export const money = (cents) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
    cents / 100,
  );
// Prix en version courte pour les accroches éditoriales : « 5 € » plutôt que
// « 5,00 € ». Les centimes réapparaissent dès qu’un tarif n’est pas rond.
export const shortMoney = (cents) =>
  cents % 100 === 0
    ? new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(cents / 100)
    : money(cents);
export const kits = [
  {
    shortName: 'restaurant',
    quote: '« Une table pour les trois ours, s’il vous plaît. »',
    id: 'restaurant',
    name: 'Le Restaurant',
    number: '01',
    line: 'La table est mise. Les histoires aussi.',
    skills: 'Échanger · Compter · Coopérer',
    accent: '#a33e2e',
    illustrationPosition: '0%',
    image: 'images/restaurant.png',
    headline: 'Aujourd’hui, le chef, c’est toi.',
    intro:
      'On dresse la table, on accueille ses invités et on prend les commandes. Un restaurant à inventer ensemble, du premier bonjour à l’addition.',
    roles: ['Les clients', 'Le service', 'La cuisine'],
    setup:
      'Une table devient le restaurant. Placez les menus côté clients et le carnet de commandes côté service. Choisissez les rôles : qui accueille, qui cuisine, qui vient déjeuner ? Les rôles tournent à chaque nouveau service.',
    contents: [
      {
        title: 'L’enseigne & la pancarte « Ouvert »',
        text: 'Pour annoncer que le restaurant accueille ses premiers invités.',
      },
      {
        title: 'Les menus & les cartes de boissons',
        text: 'Pour choisir un plat, expliquer ce qui est proposé et composer son repas.',
      },
      {
        title: 'La fiche de réservation',
        text: 'Pour préparer l’arrivée des clients et le nombre de places.',
      },
      {
        title: 'Le carnet de commandes',
        text: 'Pour noter, dessiner ou dicter ce qu’il faudra servir.',
      },
      {
        title: 'La facture & les billets de jeu',
        text: 'Pour compter selon ses acquis, sans obligation de calculer.',
      },
      {
        title: 'La carte de remerciement',
        text: 'Pour dire au revoir et terminer le service.',
      },
    ],
    steps: [
      {
        title: 'Réserver et accueillir',
        text: 'Le client donne son prénom et le nombre de convives. « Nous sommes trois. Combien d’assiettes faut-il ? » On prépare les places ensemble.',
      },
      {
        title: 'Choisir et reformuler',
        text: 'Le serveur écoute, dessine ou note la commande. « Tu as choisi une soupe et un jus, c’est bien ça ? » Un dessin vaut déjà une prise de notes.',
      },
      {
        title: 'Préparer et servir',
        text: 'La cuisine prépare les plats imaginaires. Le service associe chaque commande au bon client. Un plat manque ? On cherche une autre proposition.',
      },
      {
        title: 'Compter, puis changer de rôle',
        text: 'On donne un billet, compose une somme ou calcule l’addition selon ses acquis. On remercie ses invités, puis les clients deviennent restaurateurs.',
      },
    ],
    learning: [
      {
        title: 'Parler pour se comprendre',
        text: 'Formuler une demande, poser une question et redire ce que l’on a entendu.',
      },
      {
        title: 'Donner du sens aux quantités',
        text: 'Associer une place à une personne, préparer trois assiettes, vérifier qu’il ne manque rien.',
      },
      {
        title: 'Découvrir l’utilité de l’écrit',
        text: 'Comprendre qu’une liste ou un dessin permet de retrouver une commande.',
      },
      {
        title: 'Coopérer dans une vraie petite équipe',
        text: 'Transmettre une information à la cuisine et chercher ensemble une solution.',
      },
    ],
    ages: [
      {
        age: '3–4 ans',
        text: 'Deux choix de plats, une commande à la fois. Un adulte peut être client. Ni lecture ni addition nécessaires.',
      },
      {
        age: '5–6 ans',
        text: 'Plusieurs convives, commandes dessinées et petites quantités. Commencez avec les billets de 1.',
      },
      {
        age: '7 ans et +',
        text: 'Inventer un menu, respecter un budget et rendre la monnaie si les acquis le permettent.',
      },
    ],
    home: 'Ouvrez le restaurant des peluches ou invitez un adulte à un dîner imaginaire. Chaque client peut avoir un plat préféré à retenir.',
    classroom:
      'Installez un petit groupe et faites tourner les rôles. Choisissez une seule cible à observer : redire une commande sans rien oublier, par exemple. Le groupe prépare l’espace pour les suivants.',
    question: 'Qu’est-ce qui t’a aidé à ne pas oublier la commande ?',
    materials:
      'Une table, de la dînette, un crayon et des aliments imaginaires. Les peluches sont aussi d’excellents clients.',
  },
  {
    shortName: 'hôtel',
    quote: '« Votre doudou préfère quelle chambre ? »',
    id: 'hotel',
    name: 'L’Hôtel',
    number: '02',
    line: 'Bienvenue dans leur grand petit monde.',
    skills: 'Accueillir · Organiser · Imaginer',
    accent: '#526244',
    illustrationPosition: '50%',
    image: 'images/hotel.png',
    headline: 'Entrez, votre chambre vous attend.',
    intro:
      'Une réception sur la table, une valise sous le bras et toute une aventure commence. Accueillir, organiser, rendre service : un petit hôtel où chacun trouve sa place.',
    roles: ['La réception', 'Les voyageurs', 'L’équipe des chambres'],
    setup:
      'Transformez un coin de table en réception. Des coussins, des chaises ou des boîtes deviennent les chambres. Associez à chaque chambre un numéro, ou une couleur pour les plus petits.',
    contents: [
      {
        title: 'L’enseigne & la pancarte « Ouvert »',
        text: 'Pour transformer un coin de la pièce en petit hôtel.',
      },
      {
        title: 'La fiche client',
        text: 'Pour recueillir les informations utiles au séjour, avec un prénom imaginaire.',
      },
      {
        title: 'Le planning des chambres',
        text: 'Pour distinguer les chambres libres et occupées.',
      },
      {
        title: 'La carte d’accès & le passeport de jeu',
        text: 'Pour accueillir le voyageur et lui confier sa chambre.',
      },
      {
        title: 'Les accroche-portes',
        text: '« Ne pas déranger » et « Merci de faire la chambre » : des messages à comprendre et respecter.',
      },
      {
        title: 'La fiche petit déjeuner & les notes',
        text: 'Pour recueillir un choix et transmettre les petites demandes.',
      },
    ],
    steps: [
      {
        title: 'Préparer l’arrivée',
        text: 'La réception demande qui vient séjourner et pour combien de temps. On remplit ou on dessine la fiche client. Un prénom inventé suffit.',
      },
      {
        title: 'Trouver une chambre',
        text: 'On consulte le planning, choisit une chambre libre et remet la carte d’accès. Un numéro ou une couleur aide à retrouver son chemin.',
      },
      {
        title: 'Faire vivre le séjour',
        text: 'Le voyageur choisit son petit déjeuner ou laisse un message. L’équipe regarde l’accroche-porte et frappe avant d’entrer dans la chambre imaginaire.',
      },
      {
        title: 'Organiser le départ',
        text: 'On récupère la carte, met à jour le planning et prépare la chambre pour le prochain voyageur. À votre tour de partir en vacances !',
      },
    ],
    learning: [
      {
        title: 'Organiser des informations',
        text: 'Relier une demande à une chambre disponible et vérifier le planning.',
      },
      {
        title: 'Se repérer dans le temps',
        text: 'Mettre dans l’ordre l’arrivée, le séjour et le départ. Explorer les dates quand on est prêt.',
      },
      {
        title: 'Lire les petits signes du quotidien',
        text: 'Comprendre qu’un panneau, un numéro ou une case cochée transmet une information.',
      },
      {
        title: 'Accueillir et respecter l’autre',
        text: 'Expliquer un besoin, donner une consigne et tenir compte du « Ne pas déranger ».',
      },
    ],
    ages: [
      {
        age: '3–4 ans',
        text: 'Deux chambres repérées par couleurs. Accueillir, donner une carte et dire au revoir.',
      },
      {
        age: '5–6 ans',
        text: 'Associer un numéro à une chambre, cocher un petit déjeuner et distinguer libre et occupé.',
      },
      {
        age: '7 ans et +',
        text: 'Coordonner plusieurs arrivées, construire un planning simple et résoudre deux réservations qui se chevauchent.',
      },
    ],
    home: 'Inventez l’hôtel des doudous. Des coussins deviennent les chambres et une petite boîte fait office de valise. Chaque voyageur raconte d’où il vient.',
    classroom:
      'Matérialisez quelques chambres autour d’une réception collective. Proposez un problème : « Deux voyageurs demandent la même chambre. Quelle autre proposition peut-on faire ? »',
    question: 'Comment savais-tu qu’une chambre était prête ?',
    materials:
      'Des coussins ou boîtes, un crayon, des doudous et une petite valise si vous en avez. Les vraies clés et la sonnette de la photo ne sont pas incluses.',
  },
  {
    shortName: 'spa',
    quote: '« Tu préfères une pause ou on continue ? »',
    id: 'spa',
    name: 'Le Spa',
    number: '03',
    line: 'Un petit moment pour prendre soin du lien.',
    skills: 'Écouter · Choisir · Respecter',
    accent: '#a45251',
    illustrationPosition: '100%',
    image: 'images/spa.png',
    headline: 'Le bonheur de prendre soin du lien.',
    intro:
      'On accueille, on écoute et on choisit son moment de calme. Un spa pour faire semblant, où le plus important est de respecter les envies de chacun.',
    roles: ['L’accueil', 'Les visiteurs', 'Les responsables des espaces'],
    setup:
      'Une serviette, une poupée et des tasses vides suffisent. Disposez les panneaux pour créer les espaces. Les soins sont mimés, les boissons imaginaires et les produits restent dans l’imagination.',
    contents: [
      {
        title: 'L’enseigne & la pancarte « Ouvert »',
        text: 'Pour annoncer l’ouverture de ce petit lieu imaginaire.',
      },
      {
        title: 'Le carnet de rendez-vous',
        text: 'Pour organiser l’accueil et les passages des visiteurs.',
      },
      {
        title: 'La carte des soins imaginaires',
        text: 'Pour proposer, choisir et expliquer une activité de jeu.',
      },
      {
        title: 'Les panneaux des espaces',
        text: 'Vestiaire, massages, bar à ongles et tisanerie donnent des repères au décor.',
      },
      {
        title: 'La carte des boissons',
        text: 'Pour inventer une pause et recueillir les préférences.',
      },
      {
        title: 'Les billets de jeu',
        text: 'Pour ajouter un échange de monnaie si les enfants en ont envie.',
      },
    ],
    steps: [
      {
        title: 'Prendre rendez-vous',
        text: 'Le visiteur choisit son moment et son activité. Proposez deux possibilités pour commencer, puis notez l’ordre de passage.',
      },
      {
        title: 'Écouter le choix',
        text: 'L’enfant à l’accueil reformule : « Tu préfères un moment tranquille avec ton doudou ? » Le visiteur peut aussi ne rien choisir.',
      },
      {
        title: 'Demander l’accord',
        text: 'On propose un soin mimé sur une poupée ou un jeu sans contact. Chacun peut dire non et changer d’avis. Le jeu continue autrement.',
      },
      {
        title: 'Terminer à son rythme',
        text: 'Le visiteur poursuit à la tisanerie imaginaire ou décide de partir. On remercie, on range, puis les rôles tournent.',
      },
    ],
    learning: [
      {
        title: 'Exprimer ses préférences',
        text: 'Dire ce que l’on souhaite, ce que l’on ne souhaite pas et pouvoir changer d’avis.',
      },
      {
        title: 'Écouter sans insister',
        text: 'Tenir compte du choix de l’autre et accepter un refus.',
      },
      {
        title: 'Organiser un ordre de passage',
        text: 'Relier un rendez-vous à une activité et attendre son tour.',
      },
      {
        title: 'Mettre des mots sur ses besoins',
        text: 'Nommer des sensations simples : calme, repos, envie de faire une pause.',
      },
    ],
    ages: [
      {
        age: '3–4 ans',
        text: 'Jouer avec une poupée, proposer deux choix et utiliser les mots « oui », « non », « encore », « stop ».',
      },
      {
        age: '5–6 ans',
        text: 'Suivre un ordre de passage et reformuler les choix. La monnaie reste facultative.',
      },
      {
        age: '7 ans et +',
        text: 'Organiser plusieurs espaces, proposer des horaires simples et écrire de petites consignes d’accueil.',
      },
    ],
    home: 'Ouvrez le salon imaginaire des doudous. Inventez un rituel de calme sans obligation d’y participer, puis laissez l’enfant guider l’accueil.',
    classroom:
      'Privilégiez l’accueil, la réservation, les poupées et le jeu sans contact. Chacun peut choisir un rôle d’organisateur ou d’observateur.',
    question: 'Comment as-tu montré que tu avais entendu le choix de l’autre ?',
    materials:
      'Une poupée, une serviette et des tasses vides. Ni cosmétiques, ni boissons chaudes, ni bougies allumées ne sont nécessaires au jeu.',
    care: 'On garde ses vêtements, on n’applique aucun produit et on ne réalise pas de vrais soins. Avant tout contact, on demande l’accord ; un « non » arrête le geste. On peut toujours jouer avec une poupée ou sans contact.',
  },
];
export function getKit(id) {
  return kits.find((kit) => kit.id === id);
}
