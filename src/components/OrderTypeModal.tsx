import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin, Home, X } from 'lucide-react';

interface OrderTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (orderType: 'dine-in' | 'delivery', details: any) => void;
}

export const OrderTypeModal: React.FC<OrderTypeModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [selectedType, setSelectedType] = useState<'dine-in' | 'delivery' | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tableNumber: '',
    location: '',
    whatsappNumber: '',
    fullAddress: '',
    references: '',
    additionalComments: '',
  });

  const handleContinue = () => {
    if (selectedType && !showForm) {
      setShowForm(true);
    } else if (selectedType && showForm) {
      if (selectedType === 'dine-in' && formData.name && formData.tableNumber) {
        onConfirm(selectedType, formData);
        resetForm();
      } else if (selectedType === 'delivery' && formData.name && formData.location && formData.whatsappNumber && formData.fullAddress) {
        onConfirm(selectedType, formData);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setSelectedType(null);
    setShowForm(false);
    setFormData({
      name: '',
      tableNumber: '',
      location: '',
      whatsappNumber: '',
      fullAddress: '',
      references: '',
      additionalComments: '',
    });
  };

  const handleBack = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      onOpenChange(false);
      resetForm();
    }
  };

  const isFormValid = () => {
    if (selectedType === 'dine-in') {
      return formData.name.trim() && formData.tableNumber.trim();
    } else if (selectedType === 'delivery') {
      return formData.name.trim() && formData.location.trim() && formData.whatsappNumber.trim() && formData.fullAddress.trim();
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {showForm ? 'Datos del Cliente' : 'Tipo de Pedido'}
          </DialogTitle>
          <button
            onClick={handleBack}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {!showForm ? (
            <>
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
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nombre completo *
                  </label>
                  <Input
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                  />
                </div>

                {selectedType === 'dine-in' ? (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Número de mesa *
                    </label>
                    <Input
                      placeholder="Ej: 5"
                      value={formData.tableNumber}
                      onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Ubicación *
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecciona tu ubicación</option>
                        <option value="Centro">Centro - $15.00</option>
                        <option value="Norte">Norte - $25.00</option>
                        <option value="Sur">Sur - $30.00</option>
                        <option value="Este">Este - $20.00</option>
                        <option value="Oeste">Oeste - $20.00</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Número de WhatsApp *
                      </label>
                      <Input
                        placeholder="9612325685"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Dirección completa *
                      </label>
                      <Textarea
                        placeholder="Av.tuxtla"
                        value={formData.fullAddress}
                        onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                        className="w-full min-h-[80px]"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Referencias (opcional)
                      </label>
                      <Input
                        placeholder="Casa azul"
                        value={formData.references}
                        onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Comentarios adicionales (opcional)
                  </label>
                  <Textarea
                    placeholder="Instrucciones especiales, alergias, etc."
                    value={formData.additionalComments}
                    onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                    className="w-full min-h-[80px]"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!isFormValid()}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Continuar
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
