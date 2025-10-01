import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryBar } from '@/components/CategoryBar';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartView } from '@/components/CartView';
import { Product } from '@/contexts/CartContext';
import { products } from '@/data/products';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="container px-4 py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ¡Delicioso y Rápido!
          </h2>
          <p className="text-muted-foreground">
            Explora nuestro menú y ordena tu comida favorita
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No hay productos en esta categoría
            </p>
          </div>
        )}
      </main>

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <ProductDetailModal
        product={selectedProduct}
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
      />

      <CartView open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
};

export default Index;
