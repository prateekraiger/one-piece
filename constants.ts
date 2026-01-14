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
  }
];

export const CHARACTERS: Character[] = [
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    epithet: 'Straw Hat',
    bounty: '3,000,000,000 ฿',
    role: 'Captain',
    image: 'https://picsum.photos/seed/luffy/800/1000',
    crew: true
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    epithet: 'Pirate Hunter',
    bounty: '1,111,000,000 ฿',
    role: 'Combatant',
    image: 'https://picsum.photos/seed/zoro/800/1000',
    crew: true
  },
  {
    id: 'nami',
    name: 'Nami',
    epithet: 'Cat Burglar',
    bounty: '366,000,000 ฿',
    role: 'Navigator',
    image: 'https://picsum.photos/seed/nami/800/1000',
    crew: true
  },
  {
    id: 'sanji',
    name: 'Sanji',
    epithet: 'Black Leg',
    bounty: '1,032,000,000 ฿',
    role: 'Cook',
    image: 'https://picsum.photos/seed/sanji/800/1000',
    crew: true
  },
  {
    id: 'shanks',
    name: 'Shanks',
    epithet: 'Red-Haired',
    bounty: '4,048,900,000 ฿',
    role: 'Emperor',
    image: 'https://picsum.photos/seed/shanks/800/1000',
    crew: false
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