export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  multiplier: number;
  owned: number;
  image: string;
}

export interface GameState {
  cocoCoins: number;
  clickPower: number;
  totalClicks: number;
  upgrades: Upgrade[];
}

export interface GameStats {
  coinsPerSecond: number;
  totalUpgrades: number;
}