import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Upgrade } from '../types/game';

interface UpgradeShopProps {
  upgrades: Upgrade[];
  cocoCoins: number;
  onPurchase: (upgradeId: string) => void;
}

export const UpgradeShop: React.FC<UpgradeShopProps> = ({ upgrades, cocoCoins, onPurchase }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="text-white" />
        <h2 className="text-xl font-bold text-white">COCO's Shop</h2>
      </div>
      <div className="grid gap-4">
        {upgrades.map((upgrade) => (
          <div 
            key={upgrade.id}
            className="border border-gray-700 rounded-lg p-3 flex items-center justify-between hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img 
                src={upgrade.image} 
                alt={upgrade.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{upgrade.name}</h3>
                <p className="text-sm text-gray-300">{upgrade.description}</p>
                <p className="text-xs text-gray-400">Owned: {upgrade.owned}</p>
              </div>
            </div>
            <button
              onClick={() => onPurchase(upgrade.id)}
              disabled={cocoCoins < upgrade.cost}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
            >
              {upgrade.cost} COCO
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
