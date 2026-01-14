import { Arc, Character, Gear } from './types';

export const ARCS: Arc[] = [
  {
    id: 'east-blue',
    title: 'East Blue Saga',
    jpTitle: '東の海',
    description: 'The beginning of the legend. A boy in a barrel, a promise to a shank, and the gathering of the first four crewmates.',
    image: 'https://picsum.photos/seed/eastblue/1920/1080',
    color: 'from-blue-500 to-blue-900',
    quote: "I'm gonna be King of the Pirates!",
  },
  {
    id: 'alabasta',
    title: 'Alabasta Saga',
    jpTitle: 'アラバスタ',
    description: 'A desert kingdom on the brink of civil war. The Straw Hats face a Warlord of the Sea to save a princess.',
    image: 'https://picsum.photos/seed/alabasta/1920/1080',
    color: 'from-amber-500 to-orange-900',
    quote: "If we can't protect the captain's dream, then whatever ambition we have is nothing but talk!",
  },
  {
    id: 'enies-lobby',
    title: 'Water 7 & Enies Lobby',
    jpTitle: 'エニエス・ロビー',
    description: 'A declaration of war against the World Government. Robin screams her desire to live.',
    image: 'https://picsum.photos/seed/enies/1920/1080',
    color: 'from-cyan-600 to-slate-900',
    quote: "I want to live! Take me out to the sea with you!",
  },
  {
    id: 'marineford',
    title: 'Summit War',
    jpTitle: 'マリンフォード',
    description: 'The paramount war. The end of an era. Luffy faces the reality of the sea and suffers his greatest loss.',
    image: 'https://picsum.photos/seed/marineford/1920/1080',
    color: 'from-red-600 to-slate-950',
    quote: "One Piece... does exist!",
  },
  {
    id: 'wano',
    title: 'Wano Country',
    jpTitle: 'ワノ国',
    description: 'Samurai, Kaido, and the Drums of Liberation. The dawn of the world approaches.',
    image: 'https://picsum.photos/seed/wano/1920/1080',
    color: 'from-purple-600 to-pink-900',
    quote: "I'm not a hero. Heroes share their meat. I want to eat all the meat!",
  },
  {
    id: 'wano',
    title: 'Wano Country',
    jpTitle: 'ワノ国',
    description: 'Samurai, Kaido, and the Drums of Liberation. The dawn of the world approaches.',
    image: 'https://picsum.photos/seed/wano/1920/1080',
    color: 'from-purple-600 to-pink-900',
    quote: "I'm not a hero. Heroes share their meat. I want to eat all the meat!",
  },
  {
    id: 'egghead',
    title: 'Egghead Island',
    jpTitle: 'エッグヘッド',
    description: 'The Island of the Future. Dr. Vegapunk, the Seraphim, and a shocking revelation about the Void Century.',
    image: 'https://i.pinimg.com/736x/21/5c/55/215c5520775c742c388b13916960f845.jpg',
    color: 'from-cyan-400 to-indigo-900',
    quote: "This world... as it is now... will sink into the sea!",
  }
];

export const CHARACTERS: Character[] = [
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    epithet: 'Straw Hat',
    bounty: '3,000,000,000 ฿',
    role: 'Captain',
    image: 'https://i.pinimg.com/736x/88/44/48/884448550cb1737f26f74a0c8ab431c3.jpg',
    crew: true
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    epithet: 'Pirate Hunter',
    bounty: '1,111,000,000 ฿',
    role: 'Combatant',
    image: 'https://i.pinimg.com/736x/7d/55/7c/7d557c67425877840134443177694939.jpg',
    crew: true
  },
  {
    id: 'nami',
    name: 'Nami',
    epithet: 'Cat Burglar',
    bounty: '366,000,000 ฿',
    role: 'Navigator',
    image: 'https://i.pinimg.com/736x/55/65/d2/5565d21c372674288019e0996895ce82.jpg',
    crew: true
  },
  {
    id: 'usopp',
    name: 'Usopp',
    epithet: 'God Usopp',
    bounty: '500,000,000 ฿',
    role: 'Sniper',
    image: 'https://i.pinimg.com/736x/1a/0d/16/1a0d165f17154238779603c80961c0d4.jpg',
    crew: true
  },
  {
    id: 'sanji',
    name: 'Sanji',
    epithet: 'Black Leg',
    bounty: '1,032,000,000 ฿',
    role: 'Cook',
    image: 'https://i.pinimg.com/736x/67/83/b2/6783b27b9264c399b508d51f6784534f.jpg',
    crew: true
  },
  {
    id: 'chopper',
    name: 'Tony Tony Chopper',
    epithet: 'Cotton Candy Lover',
    bounty: '1,000 ฿',
    role: 'Doctor',
    image: 'https://i.pinimg.com/736x/e4/c1/9d/e4c19d4b31562308630325373a0026e4.jpg',
    crew: true
  },
  {
    id: 'robin',
    name: 'Nico Robin',
    epithet: 'Devil Child',
    bounty: '930,000,000 ฿',
    role: 'Archaeologist',
    image: 'https://i.pinimg.com/736x/32/79/6c/32796c342733923cc84e2776c592881a.jpg',
    crew: true
  },
  {
    id: 'franky',
    name: 'Franky',
    epithet: 'Iron Man',
    bounty: '394,000,000 ฿',
    role: 'Shipwright',
    image: 'https://i.pinimg.com/736x/e7/87/0d/e7870d0fd352528a4753049b49372ca8.jpg',
    crew: true
  },
  {
    id: 'brook',
    name: 'Brook',
    epithet: 'Soul King',
    bounty: '383,000,000 ฿',
    role: 'Musician',
    image: 'https://i.pinimg.com/736x/c5/4a/1c/c54a1c575080c59267154881ae67399a.jpg',
    crew: true
  },
  {
    id: 'jinbe',
    name: 'Jinbe',
    epithet: 'Knight of the Sea',
    bounty: '1,100,000,000 ฿',
    role: 'Helmsman',
    image: 'https://i.pinimg.com/736x/c9/79/f1/c979f18749340917208790089856f687.jpg',
    crew: true
  }
];

export const GEARS: Gear[] = [
  {
    id: 'base',
    name: 'Base Form',
    description: 'A rubber human. Impervious to bullets, weak to blades. The beginning of freedom.',
    image: 'https://picsum.photos/seed/base/800/600',
    triggerText: 'Gomu Gomu no...'
  },
  {
    id: 'second',
    name: 'Gear Second',
    description: 'Doping the blood vessels. Steam rises. Speed transcends visual perception.',
    image: 'https://picsum.photos/seed/gear2/800/600',
    triggerText: 'Gear... Second.'
  },
  {
    id: 'third',
    name: 'Gear Third',
    description: 'Bone Balloon. The power of a giant arm. Massive destruction at the cost of speed.',
    image: 'https://picsum.photos/seed/gear3/800/600',
    triggerText: 'Bone Balloon.'
  },
  {
    id: 'fourth',
    name: 'Gear Fourth: Boundman',
    description: 'Muscle Balloon coated in Haki. Elastic force meets hardness. He bounces like a ball.',
    image: 'https://picsum.photos/seed/gear4/800/600',
    triggerText: 'Muscle Balloon.'
  },
  {
    id: 'fifth',
    name: 'Gear Fifth',
    description: 'The Warrior of Liberation. Sun God Nika. The most ridiculous power in the world.',
    image: 'https://picsum.photos/seed/gear5/800/600',
    triggerText: 'Joyboy has returned.'
  }
];
