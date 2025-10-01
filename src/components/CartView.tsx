import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { OrderTypeModal } from './OrderTypeModal';
import { OrderSummaryModal } from './OrderSummaryModal';

interface CartViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartView: React.FC<CartViewProps> = ({ open, onOpenChange }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } =
    useCart();
  const [showOrderTypeModal, setShowOrderTypeModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderType: 'dine-in' | 'delivery';
    customerDetails: any;
  } | null>(null);

  const handleCheckout = () => {
    setShowOrderTypeModal(true);
  };

  const handleOrderTypeConfirm = (orderType: 'dine-in' | 'delivery', details: any) => {
    setOrderDetails({ orderType, customerDetails: details });
    setShowOrderTypeModal(false);
    setShowSummaryModal(true);
  };

  const handleSummaryBack = () => {
    setShowSummaryModal(false);
    setShowOrderTypeModal(true);
  };

  const handleFinalConfirm = () => {
    if (!orderDetails) return;

    const { orderType, customerDetails } = orderDetails;
    const businessPhoneNumber = '9614045971';
    const shippingCost = 2.50;
    const orderTypeText = orderType === 'dine-in' ? 'Para consumir en el restaurante' : 'Envío a domicilio';
    const messageTitle = orderType === 'dine-in' ? '◆ NUEVO PEDIDO - Sabores Digi' : '◆ NUEVO PEDIDO - Sabores Digi';

    let message = `${messageTitle}\n\n`;
    message += `◆ *Cliente:* ${customerDetails.name}\n`;

    if (orderType === 'dine-in') {
      message += `◆ ${orderTypeText}\n`;
      message += `◆ *Mesa:* ${customerDetails.tableNumber}\n`;
    } else {
      message += `◆ ${orderTypeText}\n`;
      message += `◆ *WhatsApp:* ${customerDetails.whatsappNumber}\n`;
      message += `◆ *Dirección:* ${customerDetails.fullAddress}\n`;
      if (customerDetails.references) {
        message += `◆ *Referencias:* ${customerDetails.references}\n`;
      }
    }

    message += `\n◆ *Productos:*\n`;
    cartItems.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    const subtotal = getTotalPrice();
    let total = subtotal;

    if (orderType === 'delivery') {
      total += shippingCost;
    }

    message += `\n◆ *Total:* $${total.toFixed(2)} MXN`;

    if (customerDetails.additionalComments) {
      message += `\n\n◆ *Comentarios:* ${customerDetails.additionalComments}`;
    }

    message += `\n\n¡Gracias por tu pedido! ◆`;

    const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    clearCart();
    setShowSummaryModal(false);
    setOrderDetails(null);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="h-6 w-6" />
            Mi Carrito
          </SheetTitle>
          <SheetDescription>
            {getTotalItems()} producto{getTotalItems() !== 1 ? 's' : ''} en tu carrito
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
            <p className="text-muted-foreground mb-6">
              Agrega algunos productos deliciosos para comenzar
            </p>
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Explorar productos
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-lg bg-card border transition-all hover:shadow-md"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${item.price.toFixed(2)} c/u
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-medium">$2.50</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${(getTotalPrice() + 2.50).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                Realizar Pedido
              </Button>
            </div>
          </>
        )}
      </SheetContent>

      <OrderTypeModal
        open={showOrderTypeModal}
        onOpenChange={setShowOrderTypeModal}
        onConfirm={handleOrderTypeConfirm}
      />

      {orderDetails && (
        <OrderSummaryModal
          open={showSummaryModal}
          onOpenChange={setShowSummaryModal}
          orderType={orderDetails.orderType}
          customerDetails={orderDetails.customerDetails}
          cartItems={cartItems}
          totalPrice={orderDetails.orderType === 'delivery' ? getTotalPrice() + 2.50 : getTotalPrice()}
          onConfirm={handleFinalConfirm}
          onBack={handleSummaryBack}
        />
      )}
    </Sheet>
  );
};
