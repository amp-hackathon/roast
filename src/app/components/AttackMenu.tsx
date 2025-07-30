'use client';

import { Attack, Fighter } from '@/app/types/battle';

interface AttackMenuProps {
  fighter: Fighter;
  attacks: Attack[];
  onAttackSelect: (attack: Attack) => void;
}

export default function AttackMenu({ fighter, attacks, onAttackSelect }: AttackMenuProps) {
  const fighterName = fighter === 'trump' ? 'Trump' : 'Elon';
  
  return (
    <div className="absolute bottom-4 right-4 bg-white/95 border-4 border-black rounded-lg p-4 max-w-md">
      <h3 className="font-bold text-lg mb-3 text-black">{fighterName}&apos;s Turn</h3>
      <p className="text-sm text-gray-900 mb-4">Choose an attack:</p>
      
      <div className="grid grid-cols-1 gap-2">
        {attacks.map((attack) => (
          <button
            key={attack.id}
            onClick={() => onAttackSelect(attack)}
            className="text-left p-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-black">{attack.name}</span>
              <span className={`text-xs px-2 py-1 rounded capitalize ${getTypeColor(attack.type)}`}>
                {attack.type}
              </span>
            </div>
            <p className="text-sm text-gray-900 line-clamp-2">{attack.roastText}</p>
            <div className="text-xs text-gray-800 mt-1">
              Base Damage: {attack.baseDamage}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    fire: 'bg-red-200 text-red-800',
    water: 'bg-blue-200 text-blue-800',
    electric: 'bg-yellow-200 text-yellow-800',
    psychic: 'bg-purple-200 text-purple-800',
    dark: 'bg-gray-200 text-gray-800',
    normal: 'bg-gray-100 text-gray-900',
    flying: 'bg-cyan-200 text-cyan-800',
    ground: 'bg-orange-200 text-orange-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-900';
}
