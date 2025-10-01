import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Todo', icon: '🍽️' },
  { id: 'burgers', name: 'Hamburguesas', icon: '🍔' },
  { id: 'hotdogs', name: 'Hot Dogs', icon: '🌭' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'drinks', name: 'Bebidas', icon: '🥤' },
  { id: 'desserts', name: 'Postres', icon: '🍰' },
];

interface CategoryBarProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pb-safe">
      <div className="container overflow-x-auto">
        <div className="flex gap-2 p-3 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                "hover:scale-105 active:scale-95",
                selectedCategory === category.id
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
