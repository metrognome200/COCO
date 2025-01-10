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
      <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-2">
        <Coins className="text-yellow-400" />
        <div>
          <p className="text-sm text-gray-300">COCO Coins</p>
          <p className="text-xl font-bold text-white">{cocoCoins.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-2">
        <TrendingUp className="text-green-400" />
        <div>
          <p className="text-sm text-gray-300">Coins per Second</p>
          <p className="text-xl font-bold text-white">{stats.coinsPerSecond.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
