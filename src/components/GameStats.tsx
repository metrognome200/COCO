import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';
import type { GameStats } from '../types/game';

interface GameStatsProps {
  cocoCoins: number;
  stats: GameStats;
}

export const GameStats: React.FC<GameStatsProps> = ({ cocoCoins, stats }) => {
  return (
    <div className="flex gap-4">
      <div className="bg-yellow-100 rounded-lg p-4 flex items-center gap-2">
        <Coins className="text-yellow-600" />
        <div>
          <p className="text-sm text-yellow-700">COCO Coins</p>
          <p className="text-xl font-bold text-yellow-900">{cocoCoins.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-green-100 rounded-lg p-4 flex items-center gap-2">
        <TrendingUp className="text-green-600" />
        <div>
          <p className="text-sm text-green-700">Coins per Second</p>
          <p className="text-xl font-bold text-green-900">{stats.coinsPerSecond.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}