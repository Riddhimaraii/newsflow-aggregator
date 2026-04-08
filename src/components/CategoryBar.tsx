import { CATEGORIES, NewsCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryBarProps {
  selected: NewsCategory;
  onChange: (c: NewsCategory) => void;
}

export default function CategoryBar({ selected, onChange }: CategoryBarProps) {
  return (
    <div className="border-b border-border overflow-x-auto scrollbar-hide">
      <div className="container flex gap-1 py-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              selected === cat.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
