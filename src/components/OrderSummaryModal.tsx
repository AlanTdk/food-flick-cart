import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { X, MessageCircle } from 'lucide-react';

interface OrderSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderType: 'dine-in' | 'delivery';
  customerDetails: any;
  cartItems: any[];
  totalPrice: number;
  shippingCost: number;
  onConfirm: () => void;
  onBack: () => void;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  open,
  onOpenChange,
  orderType,
  customerDetails,
  cartItems,
  totalPrice,
  shippingCost,
  onConfirm,
  onBack,
}) => {
  const orderTypeText = orderType === 'dine-in' ? 'Para comer aquí' : 'Envío a domicilio';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Resumen del Pedido</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Datos del pedido:</h3>
            
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Cliente:</span> {customerDetails.name}
              </p>
              <p>
                <span className="font-semibold">Tipo:</span> {orderTypeText}
              </p>
              
              {orderType === 'dine-in' ? (
                <p>
                  <span className="font-semibold">Mesa:</span> {customerDetails.tableNumber}
                </p>
              ) : (
                <>
                  <p>
                    <span className="font-semibold">Ubicación:</span> {customerDetails.location}
                  </p>
                  <p>
                    <span className="font-semibold">WhatsApp:</span> {customerDetails.whatsappNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Dirección:</span> {customerDetails.fullAddress}
                  </p>
                  {customerDetails.references && (
                    <p>
                      <span className="font-semibold">Referencias:</span> {customerDetails.references}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="border-t pt-3">
            <h3 className="font-semibold text-foreground mb-2">Productos:</h3>
            <div className="space-y-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${(totalPrice - shippingCost).toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && shippingCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío:</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {customerDetails.additionalComments && (
            <div className="border-t pt-3">
              <p className="text-sm">
                <span className="font-semibold">Comentarios:</span> {customerDetails.additionalComments}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Atrás
            </Button>
            <Button
              onClick={onConfirm}
              size="lg"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
