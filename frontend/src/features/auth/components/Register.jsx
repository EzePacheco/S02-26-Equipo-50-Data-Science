import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { Label } from "../../../shared/components/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../shared/components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shared/components/Tabs";
import { Separator } from "../../../shared/components/Separator";
import ROUTES from '../../../app/routes/route.config';
import { Loader2, Mail, Phone, Facebook } from 'lucide-react';
import logoDatamark from '../../../assets/datamark.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para registro con teléfono
  const [phone, setPhone] = useState('');
  const [phonePassword, setPhonePassword] = useState('');
  const [phoneConfirmPassword, setPhoneConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp, signUpWithPhone, signInWithFacebook } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(name, email, password);

    if (error) {
      setError('Error al crear la cuenta. Intenta de nuevo.');
      setIsLoading(false);
    } else {
      navigate(ROUTES.ONBOARDING);
    }
  };

  // Manejar registro con teléfono
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (phonePassword !== phoneConfirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (phonePassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    const { error } = await signUpWithPhone(phone, phonePassword);

    if (error) {
      setError('Error al crear la cuenta. Intenta de nuevo.');
      setIsLoading(false);
    } else {
      navigate(ROUTES.ONBOARDING);
    }
  };

  // Manejar registro con Facebook
  const handleFacebookRegister = async () => {
    setIsLoading(true);

    const { error } = await signInWithFacebook();

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate(ROUTES.ONBOARDING);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 flex items-center justify-center">
            <img src={logoDatamark} alt="datamark" className="w-full h-full object-contain" />
          </div>
          <div>
            <CardTitle className="text-2xl text-blue-600">Crear Cuenta</CardTitle>
            <CardDescription className="text-base mt-1">
              Comienza a gestionar tu tienda hoy
            </CardDescription>
          </div>
        </CardHeader>


        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Correo
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono
              </TabsTrigger>
            </TabsList>

            {/* Registro con Email */}
            <TabsContent value="email">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              </form>
            </TabsContent>

            {/* Registro con Teléfono */}
            <TabsContent value="phone">
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+51 999 999 999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phonePassword">Contraseña</Label>
                  <Input
                    id="phonePassword"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={phonePassword}
                    onChange={(e) => setPhonePassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneConfirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="phoneConfirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={phoneConfirmPassword}
                    onChange={(e) => setPhoneConfirmPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Separador */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">O regístrate con</span>
            </div>
          </div>

          {/* Botón de Facebook */}
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={handleFacebookRegister}
            disabled={isLoading}
          >
            <Facebook className="mr-2 h-5 w-5 text-[#1877F2]" />
            Continuar con Facebook
          </Button>

          {/* Links */}
          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to={ROUTES.LOGIN} className="text-blue-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            <Link to={ROUTES.LANDING} className="hover:underline">
              Volver al inicio
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}