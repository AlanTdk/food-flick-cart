import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Product, useCart } from '@/contexts/CartContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  open,
  onOpenChange,
}) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [localQuantity, setLocalQuantity] = useState(1);

  if (!product) return null;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    for (let i = 0; i < localQuantity; i++) {
      addToCart(product);
    }
    setLocalQuantity(1);
    onOpenChange(false);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      setLocalQuantity(1);
      return;
    }
    setLocalQuantity(newQuantity);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="relative -mt-6 -mx-6 mb-4 aspect-video overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{product.name}</DialogTitle>
          <DialogDescription className="text-base text-foreground/80 mt-2 leading-relaxed">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        {product.ingredients && product.ingredients.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Ingredientes:</h4>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between py-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Precio</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleUpdateQuantity(localQuantity - 1)}
              className="h-10 w-10 rounded-full"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-xl font-semibold w-8 text-center">
              {localQuantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleUpdateQuantity(localQuantity + 1)}
              className="h-10 w-10 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {currentQuantity > 0 && (
          <div className="px-4 py-2 rounded-lg bg-muted text-sm text-center">
            Ya tienes <span className="font-semibold">{currentQuantity}</span> en
            el carrito
          </div>
        )}

        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Agregar al carrito - ${(product.price * localQuantity).toFixed(2)}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
