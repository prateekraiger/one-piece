export interface Arc {
  id: string;
  title: string;
  jpTitle: string;
  description: string;
  image: string;
  color: string;
  quote: string;
}

export interface Character {
  id: string;
  name: string;
  epithet: string;
  bounty: string;
  role: string;
  image: string;
  crew?: boolean;
}

export interface Gear {
  id: string;
  name: string;
  description: string;
  image: string;
  triggerText: string;
}