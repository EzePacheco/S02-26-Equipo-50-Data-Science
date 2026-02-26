import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Checkbox } from '../../../shared/components/Checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../shared/components/Card';
import { useAuth } from '../../auth/hooks/useAuth';
import { useProfile } from '../../auth/hooks/useProfile';
import { toast } from '../../../shared/utils/toast';
import ROUTES from '../../../app/routes/route.config';
import { Loader2, ArrowRight, Tags } from 'lucide-react';
import logoDatamark from '../../../assets/datamark.png';

const CATEGORIES = [
  'Ropa de Mujer',
  'Ropa de Hombre',
  'Ropa de Niños',
  'Calzado de mujer',
  'Calzado de hombre',
  'Accesorios',
  'Ropa Deportiva',
  'Ropa Interior',
  'Otros',
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProfile } = useProfile(user?.id);

  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleNext = () => {
    if (!storeName.trim()) {
      toast.error('Por favor ingresa el nombre de tu tienda');
      return;
    }
    setStep(2);
  };

  const handleComplete = async () => {
    if (selectedCategories.length === 0) {
      toast.error('Selecciona al menos una categoría');
      return;
    }

    setLoading(true);

    try {
      await updateProfile.mutateAsync({
        name: storeName.trim(),
        categories: selectedCategories,
      });
      toast.success('¡Tu tienda está lista!');
      navigate(ROUTES.DASHBOARD);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            <img src={logoDatamark} alt="VentaFácil" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-xl">
            {step === 1 ? 'Configura tu tienda' : 'Selecciona tus categorías'}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? 'Paso 1 de 2: Información básica'
              : 'Paso 2 de 2: ¿Qué vendes?'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* PASO 1: Nombre de la tienda */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nombre de tu tienda</Label>
                <Input
                  id="storeName"
                  placeholder="Ej: Boutique María"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="h-12"
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>
              <Button onClick={handleNext} className="w-full h-12 text-base">
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* PASO 2: Categorías */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${selectedCategories.includes(category)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                      }`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>

              {/* Contador de seleccionadas */}
              {selectedCategories.length > 0 && (
                <p className="text-center text-xs text-blue-600 font-medium">
                  {selectedCategories.length} categoría{selectedCategories.length > 1 ? 's' : ''} seleccionada{selectedCategories.length > 1 ? 's' : ''}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 h-12 text-base"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Completar
                </Button>
              </div>
            </div>
          )}

          {/* Indicador de progreso */}
          <div className="mt-6 flex justify-center gap-2">
            <div className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}