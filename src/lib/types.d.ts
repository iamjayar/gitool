export interface Category {
  id: number;
  name: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  variant: number[] | null;
  reward: number[] | number;
}
