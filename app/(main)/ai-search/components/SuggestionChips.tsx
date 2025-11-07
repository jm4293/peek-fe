interface SuggestionChipsProps {
  items: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}

const SuggestionChips = ({ items, onSelect, disabled }: SuggestionChipsProps) => {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item)}
          className="rounded-full border border-theme-main-color/40 bg-theme-bg-section px-3 py-1.5 text-xs font-medium text-theme-main-color transition hover:bg-theme-main-color/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;

