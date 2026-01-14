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
    crew: true,
    color: 'from-red-600 to-red-900',
    description: 'The Captain of the Straw Hat Pirates. He ate the Gomu Gomu no Mi, becoming a rubber human. His dream is to find the One Piece and become the King of the Pirates. He fights with complete freedom.',
    quote: "I'm gonna be King of the Pirates!"
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    epithet: 'Pirate Hunter',
    bounty: '1,111,000,000 ฿',
    role: 'Combatant',
    image: '/characters/zoro.png',
    crew: true,
    color: 'from-green-600 to-green-900',
    description: 'A master swordsman who practices the Three Sword Style. He aims to become the World\'s Greatest Swordsman. His loyalty to his captain is absolute, and his ambition cuts through steel.',
    quote: "Nothing happened."
  },
  {
    id: 'nami',
    name: 'Nami',
    epithet: 'Cat Burglar',
    bounty: '366,000,000 ฿',
    role: 'Navigator',
    image: '/characters/nami.png',
    crew: true,
    color: 'from-orange-400 to-orange-700',
    description: 'A genius navigator who can predict the weather with her body. She dreams of drawing a map of the entire world. She fights with the Clima-Tact, manipulating the weather itself.',
    quote: "Luffy... Help me."
  },
  {
    id: 'usopp',
    name: 'Usopp',
    epithet: 'God Usopp',
    bounty: '500,000,000 ฿',
    role: 'Sniper',
    image: '/characters/usopp.png',
    crew: true,
    color: 'from-yellow-600 to-amber-800',
    description: 'A sniper with terrifying accuracy and a negative attitude. He dreams of becoming a brave warrior of the sea. His lies often come true, and his aim never falters when it matters.',
    quote: "I have 8,000 followers!"
  },
  {
    id: 'sanji',
    name: 'Sanji',
    epithet: 'Black Leg',
    bounty: '1,032,000,000 ฿',
    role: 'Cook',
    image: '/characters/sanji.png',
    crew: true,
    color: 'from-blue-600 to-blue-900',
    description: 'A chef who seeks the All Blue. He fights only with his legs to protect his hands for cooking. A gentleman who will never kick a woman, even if it kills him.',
    quote: "I was just... lighting my cigarette."
  },
  {
    id: 'chopper',
    name: 'Tony Tony Chopper',
    epithet: 'Cotton Candy Lover',
    bounty: '1,000 ฿',
    role: 'Doctor',
    image: '/characters/chopper.png',
    crew: true,
    color: 'from-pink-400 to-pink-700',
    description: 'A reindeer who ate the Hito Hito no Mi. He is a skilled doctor who wants to cure every disease. Though often mistaken for a pet, he is a monster in his own right.',
    quote: "I'll become a doctor who can cure anything!"
  },
  {
    id: 'robin',
    name: 'Nico Robin',
    epithet: 'Devil Child',
    bounty: '930,000,000 ฿',
    role: 'Archaeologist',
    image: '/characters/robin.png',
    crew: true,
    color: 'from-purple-600 to-purple-900',
    description: 'The sole survivor of Ohara. She can read Poneglyphs and seeks the true history of the world. For years she ran, but now she has found a place to call home.',
    quote: "I want to live!"
  },
  {
    id: 'franky',
    name: 'Franky',
    epithet: 'Iron Man',
    bounty: '394,000,000 ฿',
    role: 'Shipwright',
    image: '/characters/franky.png',
    crew: true,
    color: 'from-cyan-500 to-cyan-800',
    description: 'A cyborg shipwright who built the Thousand Sunny. He dreams of creating a ship that can sail to the end of the world. He runs on cola and is always SUPER!',
    quote: "SUUUUPER!"
  },
  {
    id: 'brook',
    name: 'Brook',
    epithet: 'Soul King',
    bounty: '383,000,000 ฿',
    role: 'Musician',
    image: '/characters/brook.png',
    crew: true,
    color: 'from-slate-200 to-slate-500',
    description: 'A revived skeleton musician. He waited 50 years to keep a promise to a whale. He fights with the chill of the underworld and cuts the soul itself.',
    quote: "May I see your panties?"
  },
  {
    id: 'jinbe',
    name: 'Jinbe',
    epithet: 'Knight of the Sea',
    bounty: '1,100,000,000 ฿',
    role: 'Helmsman',
    image: '/characters/jinbe.png',
    crew: true,
    color: 'from-indigo-600 to-indigo-900',
    description: 'A whale shark Fish-Man and master of Fish-Man Karate. He dreams of peace between humans and Fish-Men. A man of honor who joined the crew after settling his debts.',
    quote: "I'm a man who wants to join the future Pirate King's crew!"
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
