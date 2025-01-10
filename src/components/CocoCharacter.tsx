import React from 'react';
import { Sparkles } from 'lucide-react';

interface CocoCharacterProps {
  onClick: () => void;
  clickPower: number;
}

export const CocoCharacter: React.FC<CocoCharacterProps> = ({ onClick, clickPower }) => {
  return (
    <div 
      className="relative cursor-pointer transform transition-transform active:scale-95"
      onClick={onClick}
    >
      <div className="relative w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
        <img 
          src="https://donotpoly.ir/coco/gmm.png" 
          alt="COCO the Gnome" 
          className="w-40 h-40 object-cover rounded-full"
        />
        <Sparkles className="absolute -top-2 -right-2 text-yellow-400 w-8 h-8" />
      </div>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
        +{clickPower} per click
      </div>
    </div>
  );
}
