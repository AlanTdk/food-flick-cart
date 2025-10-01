import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { MapPin, Home, X } from 'lucide-react';

interface OrderTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (orderType: 'dine-in' | 'delivery') => void;
}

export const OrderTypeModal: React.FC<OrderTypeModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [selectedType, setSelectedType] = useState<'dine-in' | 'delivery' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onConfirm(selectedType);
      setSelectedType(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Tipo de Pedido</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <p className="text-muted-foreground">¿Cómo prefieres recibir tu pedido?</p>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedType('dine-in')}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedType === 'dine-in'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Para Comer Aquí</h3>
                  <p className="text-sm text-muted-foreground">Consumir en el restaurante</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('delivery')}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedType === 'delivery'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Enviar a Domicilio</h3>
                  <p className="text-sm text-muted-foreground">Entrega en tu dirección</p>
                </div>
              </div>
            </button>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
