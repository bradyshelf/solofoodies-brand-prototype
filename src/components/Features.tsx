
import { Palette, Code, Smartphone, Zap, Shield, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: "Diseño Hermoso",
      description: "Visuales impresionantes que cautivan e involucran a tu audiencia con estética moderna."
    },
    {
      icon: Code,
      title: "Código Limpio",
      description: "Código bien estructurado y mantenible que sigue las mejores prácticas de la industria."
    },
    {
      icon: Smartphone,
      title: "Responsivo",
      description: "Experiencia perfecta en todos los dispositivos, desde móvil hasta escritorio."
    },
    {
      icon: Zap,
      title: "Rendimiento Rápido",
      description: "Optimizado para velocidad con tiempos de carga ultrarrápidos."
    },
    {
      icon: Shield,
      title: "Seguro",
      description: "Construido con seguridad en mente, protegiendo tus datos y usuarios."
    },
    {
      icon: Globe,
      title: "Alcance Global",
      description: "Accesible mundialmente con soporte de internacionalización."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              Por Qué Elegirnos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combinamos creatividad con experiencia técnica para ofrecer experiencias digitales excepcionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
