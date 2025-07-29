import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Users, MapPin, Star, ArrowRight, CheckCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/auth');
  };
  const handleRestaurantSignUp = () => {
    navigate('/auth?mode=signup&role=restaurant');
  };
  const handleCreatorSignUp = () => {
    navigate('/auth?mode=signup&role=foodie');
  };
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-6 md:px-6 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Solo Foodies</span>
          </div>
          <Button variant="outline" onClick={handleGetStarted} className="hidden md:flex">
            Iniciar Sesión
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Conecta Creadores de Contenido
              <span className="text-red-500"> con Restaurantes Locales</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              La plataforma donde influencers gastronómicos y restaurantes crean colaboraciones increíbles. 
              Descubre nuevas alianzas y haz crecer tu audiencia.
            </p>
            <Button onClick={handleGetStarted} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg rounded-lg">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfecto para Todos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ya seas un restaurante buscando exposición o un creador de contenido buscando colaboraciones, 
              te tenemos cubierto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* For Restaurants */}
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-red-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Restaurantes y Agencias</h3>
                <p className="text-gray-600 mb-6">
                  Conecta con influencers gastronómicos y creadores para mostrar tus platos a nuevas audiencias.
                </p>
                <ul className="space-y-3 mb-6 max-w-sm mx-auto">
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Encuentra creadores gastronómicos relevantes</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Crea ofertas de colaboración</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Rastrea el éxito de las alianzas</span>
                  </li>
                </ul>
                <Button onClick={handleRestaurantSignUp} className="w-full bg-red-500 hover:bg-red-600">
                  Comenzar como Restaurante
                </Button>
              </CardContent>
            </Card>

            {/* For Food Creators */}
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Foodies</h3>
                <p className="text-gray-600 mb-6">
                  Descubre restaurantes increíbles y crea contenido mientras disfrutas de grandes experiencias gastronómicas.
                </p>
                <ul className="space-y-3 mb-6 max-w-sm mx-auto text-center">
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Explora oportunidades de colaboración</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Muestra tu portafolio</span>
                  </li>
                  <li className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Recibe pagos por contenido</span>
                  </li>
                </ul>
                <Button onClick={handleCreatorSignUp} className="w-full bg-green-500 hover:bg-green-600">
                  Comenzar como Creador
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pasos simples para comenzar tu viaje de colaboración gastronómica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-500">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Regístrate</h3>
              <p className="text-gray-600">Crea tu perfil como restaurante o creador gastronómico</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-500">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conecta</h3>
              <p className="text-gray-600">Explora y conecta con posibles socios de colaboración</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-500">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Colabora</h3>
              <p className="text-gray-600">Crea contenido increíble y crece juntos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Precios para Restaurantes</h2>
            
          </div>

          <div className="flex justify-center max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative border-2 border-gray-200 shadow-lg max-w-sm w-full">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  
                  <div className="text-4xl font-bold text-gray-900 mb-1">$29</div>
                  <p className="text-gray-600">por mes</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Hasta 5 colaboraciones activas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Búsqueda básica de creadores</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Mensajería directa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Analíticas básicas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Todos los planes incluyen una prueba gratuita de 14 días. No se requiere tarjeta de crédito.
            </p>
            <p className="text-sm text-gray-500">
              ¡Los creadores gastronómicos pueden unirse y usar la plataforma completamente gratis!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-gray-200 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Solo Foodies</span>
            </div>
            <p className="text-gray-600 text-center md:text-right">
              © 2024 Solo Foodies. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Homepage;