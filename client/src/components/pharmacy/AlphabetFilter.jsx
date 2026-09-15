import React from 'react';
import { ALPHABET_LETTERS } from '../../data/pharmacy';

export default function AlphabetFilter({ selectedLetter = '', onSelectLetter, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto pb-2 scrollbar-thin ${className}`} role="navigation" aria-label="A to Z medicine index">
      <div className="flex items-center gap-1.5 min-w-max p-1 bg-neutral-100/80 rounded-2xl border border-neutral-200/60">
        <button
          type="button"
          onClick={() => onSelectLetter('')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
            !selectedLetter
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/80'
          }`}
          aria-current={!selectedLetter ? 'true' : undefined}
        >
          All
        </button>

        {ALPHABET_LETTERS.map((letter) => {
          const isSelected = selectedLetter.toUpperCase() === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => onSelectLetter(letter)}
              className={`w-8 h-8 rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-150 ${
                isSelected
                  ? 'bg-primary-600 text-white shadow-sm ring-2 ring-primary-400/30 font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/90'
              }`}
              aria-label={`Browse medicines starting with ${letter}`}
              aria-current={isSelected ? 'true' : undefined}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
