export interface Category {
  id: number;
  name: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  category: number;
  reward: number;
  version: string;
}
