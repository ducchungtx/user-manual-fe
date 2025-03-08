interface AlphabetFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

export const AlphabetFilter = ({ selectedLetter, onLetterSelect }: AlphabetFilterProps) => {
  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterSelect(selectedLetter === letter ? null : letter)}
          className={`px-3 py-1 rounded ${selectedLetter === letter
            ? 'bg-primary text-white dark:text-gray-800'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};