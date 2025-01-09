import React, { useState, useEffect } from 'react';
import { CocoCharacter } from './components/CocoCharacter';
import { UpgradeShop } from './components/UpgradeShop';
import { GameStats } from './components/GameStats';
import type { GameState, GameStats as GameStatsType, Upgrade } from './types/game';

const initialUpgrades: Upgrade[] = [
  {
    id: 'magic-wand',
    name: 'Magic Wand',
    description: 'Increases click power by 2',
    cost: 10,
    multiplier: 2,
    owned: 0,
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=100&h=100&fit=crop'
  },
  {
    id: 'garden-helper',
    name: 'Garden Helper',
    description: 'Automatically generates 1 coin per second',
    cost: 50,
    multiplier: 1,
    owned: 0,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=100&h=100&fit=crop'
  },
  {
    id: 'mushroom-farm',
    name: 'Mushroom Farm',
    description: 'Generates 5 coins per second',
    cost: 200,
    multiplier: 5,
    owned: 0,
    image: 'https://images.unsplash.com/photo-1542827387-4c54fb7e47f3?w=100&h=100&fit=crop'
  }
];

const initialState: GameState = {
  cocoCoins: 0,
  clickPower: 1,
  totalClicks: 0,
  upgrades: initialUpgrades,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const stats: GameStatsType = {
    coinsPerSecond: gameState.upgrades.reduce((acc, upgrade) => {
      if (upgrade.id !== 'magic-wand') {
        return acc + (upgrade.multiplier * upgrade.owned);
      }
      return acc;
    }, 0),
    totalUpgrades: gameState.upgrades.reduce((acc, upgrade) => acc + upgrade.owned, 0),
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        cocoCoins: prev.cocoCoins + stats.coinsPerSecond
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [stats.coinsPerSecond]);

  const handleClick = () => {
    setGameState(prev => ({
      ...prev,
      cocoCoins: prev.cocoCoins + prev.clickPower,
      totalClicks: prev.totalClicks + 1,
    }));
  };

  const handlePurchase = (upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade || prev.cocoCoins < upgrade.cost) return prev;

      const updatedUpgrades = prev.upgrades.map(u => {
        if (u.id === upgradeId) {
          return { ...u, owned: u.owned + 1 };
        }
        return u;
      });

      return {
        ...prev,
        cocoCoins: prev.cocoCoins - upgrade.cost,
        clickPower: upgradeId === 'magic-wand' 
          ? prev.clickPower + upgrade.multiplier 
          : prev.clickPower,
        upgrades: updatedUpgrades,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          COCO's Clicker Adventure
        </h1>
        
        <GameStats cocoCoins={gameState.cocoCoins} stats={stats} />
        
        <div className="mt-8 flex flex-col items-center gap-8">
          <CocoCharacter onClick={handleClick} clickPower={gameState.clickPower} />
          
          <div className="w-full">
            <UpgradeShop 
              upgrades={gameState.upgrades}
              cocoCoins={gameState.cocoCoins}
              onPurchase={handlePurchase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;