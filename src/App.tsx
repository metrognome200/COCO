import React, { useState, useEffect } from 'react';
import { CocoCharacter } from './components/CocoCharacter';
import { UpgradeShop } from './components/UpgradeShop';
import { GameStats } from './components/GameStats';
import type { GameState, GameStats as GameStatsType, Upgrade } from './types/game';

const initialUpgrades: Upgrade[] = [
  {
    id: 'magic-wand',
    name: 'Rich Gnome',
    description: 'Increases click power by 0.2',
    cost: 10,
    multiplier: 0.2,
    owned: 0,
    image: 'https://donotpoly.ir/coco/gnome1.jpg'
  },
  {
    id: 'Damn Gnome',
    name: 'Garden Helper',
    description: 'Automatically generates 0.1 coin per second',
    cost: 50,
    multiplier: 0.1,
    owned: 0,
    image: 'https://donotpoly.ir/coco/gnome2.jpg'
  },
  {
    id: 'little one',
    name: 'Mushroom Farm',
    description: 'Generates 0.5 coins per second',
    cost: 200,
    multiplier: 0.5,
    owned: 0,
    image: 'https://donotpoly.ir/coco/gnome3.jpg'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          $COCO's Clicker
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
