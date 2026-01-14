import { Arc, Character, Gear } from './types';

export const ARCS: Arc[] = [
  {
    id: 'east-blue',
    title: 'East Blue Saga',
    jpTitle: '東の海',
    description: 'The beginning of the legend. A boy in a barrel, a promise to a shank, and the gathering of the first four crewmates.',
    image: '/arcs/east-blue.png',
    color: 'from-blue-500 to-blue-900',
    quote: "I'm gonna be King of the Pirates!",
  },
  {
    id: 'alabasta',
    title: 'Alabasta Saga',
    jpTitle: 'アラバスタ',
    description: 'A desert kingdom on the brink of civil war. The Straw Hats face a Warlord of the Sea to save a princess.',
    image: '/arcs/alabasta.png',
    color: 'from-amber-500 to-orange-900',
    quote: "If we can't protect the captain's dream, then whatever ambition we have is nothing but talk!",
  },
  {
    id: 'enies-lobby',
    title: 'Water 7 & Enies Lobby',
    jpTitle: 'エニエス・ロビー',
    description: 'A declaration of war against the World Government. Robin screams her desire to live.',
    image: '/arcs/enies-lobby.png',
    color: 'from-cyan-600 to-slate-900',
    quote: "I want to live! Take me out to the sea with you!",
  },
  {
    id: 'marineford',
    title: 'Summit War',
    jpTitle: 'マリンフォード',
    description: 'The paramount war. The end of an era. Luffy faces the reality of the sea and suffers his greatest loss.',
    image: '/arcs/marineford.png',
    color: 'from-red-600 to-slate-950',
    quote: "One Piece... does exist!",
  },
  {
    id: 'wano',
    title: 'Wano Country',
    jpTitle: 'ワノ国',
    description: 'Samurai, Kaido, and the Drums of Liberation. The dawn of the world approaches.',
    image: '/arcs/wano.png',
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
    image: '/characters/luffy.png',
    crew: true
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    epithet: 'Pirate Hunter',
    bounty: '1,111,000,000 ฿',
    role: 'Combatant',
    image: '/characters/zoro.png',
    crew: true
  },
  {
    id: 'nami',
    name: 'Nami',
    epithet: 'Cat Burglar',
    bounty: '366,000,000 ฿',
    role: 'Navigator',
    image: '/characters/nami.png',
    crew: true
  },
  {
    id: 'usopp',
    name: 'Usopp',
    epithet: 'God Usopp',
    bounty: '500,000,000 ฿',
    role: 'Sniper',
    image: '/characters/usopp.png',
    crew: true
  },
  {
    id: 'sanji',
    name: 'Sanji',
    epithet: 'Black Leg',
    bounty: '1,032,000,000 ฿',
    role: 'Cook',
    image: '/characters/sanji.png',
    crew: true
  },
  {
    id: 'chopper',
    name: 'Tony Tony Chopper',
    epithet: 'Cotton Candy Lover',
    bounty: '1,000 ฿',
    role: 'Doctor',
    image: '/characters/chopper.png',
    crew: true
  },
  {
    id: 'robin',
    name: 'Nico Robin',
    epithet: 'Devil Child',
    bounty: '930,000,000 ฿',
    role: 'Archaeologist',
    image: '/characters/robin.png',
    crew: true
  },
  {
    id: 'franky',
    name: 'Franky',
    epithet: 'Iron Man',
    bounty: '394,000,000 ฿',
    role: 'Shipwright',
    image: '/characters/franky.png',
    crew: true
  },
  {
    id: 'brook',
    name: 'Brook',
    epithet: 'Soul King',
    bounty: '383,000,000 ฿',
    role: 'Musician',
    image: '/characters/brook.png',
    crew: true
  },
  {
    id: 'jinbe',
    name: 'Jinbe',
    epithet: 'Knight of the Sea',
    bounty: '1,100,000,000 ฿',
    role: 'Helmsman',
    image: '/characters/jinbe.png',
    crew: true
  }
];

export const GEARS: Gear[] = [
  {
    id: 'base',
    name: 'Base Form',
    description: 'A rubber human. Impervious to bullets, weak to blades. The beginning of freedom.',
    image: '/gears/base.png',
    triggerText: 'Gomu Gomu no...'
  },
  {
    id: 'second',
    name: 'Gear Second',
    description: 'Doping the blood vessels. Steam rises. Speed transcends visual perception.',
    image: '/gears/gear2.png',
    triggerText: 'Gear... Second.'
  },
  {
    id: 'third',
    name: 'Gear Third',
    description: 'Bone Balloon. The power of a giant arm. Massive destruction at the cost of speed.',
    image: '/gears/gear3.png',
    triggerText: 'Bone Balloon.'
  },
  {
    id: 'fourth',
    name: 'Gear Fourth: Boundman',
    description: 'Muscle Balloon coated in Haki. Elastic force meets hardness. He bounces like a ball.',
    image: '/gears/gear4.png',
    triggerText: 'Muscle Balloon.'
  },
  {
    id: 'fifth',
    name: 'Gear Fifth',
    description: 'The Warrior of Liberation. Sun God Nika. The most ridiculous power in the world.',
    image: '/gears/gear5.png',
    triggerText: 'Joyboy has returned.'
  }
];
