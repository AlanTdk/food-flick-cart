import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <span className="text-xl font-bold text-primary-foreground">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Feast</h1>
            <p className="text-xs text-muted-foreground">Delivery rápido</p>
          </div>
        </div>

        <Button
          onClick={onCartClick}
          variant="outline"
          size="icon"
          className="relative hover:bg-primary/10 hover:border-primary transition-all"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};
