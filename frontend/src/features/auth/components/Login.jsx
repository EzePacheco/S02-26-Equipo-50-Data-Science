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
import { Separator } from "../../../shared/components/Separator";
import ROUTES from '../../../app/routes/route.config';
import { Loader2, Facebook } from 'lucide-react';
import logoDatamark from '../../../assets/datamark.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signInWithFacebook } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Correo o contraseña incorrectos');
      setIsLoading(false);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);

    const { error } = await signInWithFacebook();

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate(ROUTES.DASHBOARD);
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
            <CardTitle className="text-2xl">DATAMARK</CardTitle>
            <CardDescription className="text-base mt-1">
              Gestiona tu tienda de forma simple
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </Button>

            {/* Separador */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">O continúa con</span>
              </div>
            </div>

            {/* Botón de Facebook */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={handleFacebookLogin}
              disabled={isLoading}
            >
              <Facebook className="mr-2 h-5 w-5 text-[#1877F2]" />
              Continuar con Facebook
            </Button>

            <p className="text-sm text-gray-500 text-center">
              ¿No tienes cuenta?{' '}
              <Link to={ROUTES.REGISTER} className="text-blue-600 hover:underline font-medium">
                Regístrate aquí
              </Link>
            </p>

            <p className="text-center text-sm text-gray-500">
              <Link to={ROUTES.LANDING} className="hover:underline">
                Volver al inicio
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}