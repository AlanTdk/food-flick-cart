import { Card } from './ui/card';
import { Product } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group cursor-pointer overflow-hidden border-0 bg-card",
        "transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        "active:scale-95"
      )}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md transition-transform group-hover:scale-110">
            <span className="text-lg font-bold">+</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
