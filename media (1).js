/* =====================================================
   LE BURGER MAÎCHE — media.js
   Toutes les vidéos et photos du site au même endroit.
   Sources : Pexels (licence libre, usage commercial OK).

   👉 POUR METTRE VOS PROPRES MÉDIAS :
      remplacez simplement l'adresse par un fichier local,
      ex. 'videos/tacos.mp4' ou 'photos/burger.jpg',
      déposé à côté de index.html.
   ===================================================== */

/* --- Séquence vidéo du hero (défile en boucle) --- */
const HERO_CLIPS = [
  {
    src  : 'https://videos.pexels.com/video-files/8448181/8448181-hd_1920_1080_24fps.mp4',
    alt  : 'https://videos.pexels.com/video-files/8448181/8448181-uhd_2560_1440_24fps.mp4',
    kicker:'En cuisine',
    title:'Le tacos<br><span>monté sous vos yeux</span>',
    sub  : 'Viandes grillées minute, sauces maison, gratinage offert.'
  },
  {
    src  : 'https://videos.pexels.com/video-files/34556296/14641986_1920_1080_24fps.mp4',
    alt  : '',
    kicker:'Sur la plancha',
    title:'Le cheddar fond<br><span>sur le steak</span>',
    sub  : 'Steak 180 g saisi à la commande, jamais réchauffé.'
  },
  {
    src  : 'https://videos.pexels.com/video-files/5528189/5528189-hd_1920_1080_25fps.mp4',
    alt  : '',
    kicker:'La broche',
    title:'Le kebab<br><span>tranché à la minute</span>',
    sub  : 'Viande marinée sur place, découpée devant vous.'
  },
  {
    src  : 'https://videos.pexels.com/video-files/3135954/3135954-hd_1920_1080_30fps.mp4',
    alt  : '',
    kicker:'Au grill',
    title:'La braise<br><span>fait le goût</span>',
    sub  : 'Brochettes et merguez grillées au feu, comme à la maison.'
  }
];

/* --- Vidéo de la bande immersive --- */
const STRIP_VIDEO = {
  src   : 'https://videos.pexels.com/video-files/8880957/8880957-hd_1920_1080_25fps.mp4',
  alt   : 'https://videos.pexels.com/video-files/8880957/8880957-uhd_2732_1440_25fps.mp4',
  poster: 'https://images.pexels.com/photos/38041255/pexels-photo-38041255.jpeg?auto=compress&cs=tinysrgb&w=1600'
};

/* --- Images de secours (affichées pendant le chargement) --- */
const HERO_POSTERS = [
  'https://images.pexels.com/photos/18811256/pexels-photo-18811256.png?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/38041255/pexels-photo-38041255.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/videos/5528189/pexels-photo-5528189.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/videos/3135954/free-video-3135954.jpg?auto=compress&cs=tinysrgb&w=1600'
];

/* --- Photos : une par catégorie de commande (remplacent les emojis) --- */
const IMG = (id,ext,w,h)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext||'jpeg'}?auto=compress&cs=tinysrgb&w=${w||420}&h=${h||320}&fit=crop`;

const CAT_IMAGES = {
  burger   : IMG(38041255),
  tacos    : IMG(18811256,'png'),
  kebab    : IMG(33653736),
  durum    : IMG(38337105),
  sandwich : IMG(29306495),
  panini   : IMG(29614913),
  pizza    : IMG(19786212),
  pides    : IMG(7813739),
  lahmacun : IMG(15793852),
  assiette : IMG(36287931),
  barquette: IMG(36025972),
  salade   : IMG(24513386),
  collation: IMG(30736881),
  menus    : IMG(29306499),
  dessert  : IMG(5323489)
};

/* --- Photos des best-sellers --- */
const STAR_IMAGES = {
  burger  : IMG(38041255,'jpeg',900,620),
  tacos   : IMG(18811256,'png',900,620),
  assiette: IMG(36287931,'jpeg',900,620),
  kebab   : IMG(38337105,'jpeg',900,620)
};

/* --- Galerie « notre cuisine » --- */
const GALLERY = [
  IMG(33653736,'jpeg',600,600),
  IMG(18811256,'png',600,600),
  IMG(38041255,'jpeg',600,600),
  IMG(15793852,'jpeg',600,600),
  IMG(36287931,'jpeg',600,600),
  IMG(5323489,'jpeg',600,600)
];
