/// <reference types="@sveltejs/kit" />

interface CategoryTypes {
  id: number;
  name: string;
  count: number;
}

interface AchievementTypes {
  id: number;
  name: string;
  description: string;
  variant: number[] | null;
  reward: number[] | number;
}

interface CollectionNumberTypes {
  [key: string]: number;
}
