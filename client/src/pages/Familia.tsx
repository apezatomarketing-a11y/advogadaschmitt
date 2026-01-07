import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { Button } from "@/components/ui/button";
import { BRAND_WHATSAPP } from "@/const";
import { ArrowRight, Users, ShieldCheck } from "lucide-react";

export default function Familia() {
  const services = [
    {
      id: "sucessorio",
      icon: Users,
      title: "Planejamento Sucessório",
      description: "Organização da sucessão patrimonial para garantir a harmonia familiar e a preservação dos bens.",
      details: "Elaboração de testamentos, doações, usufruto e outras ferramentas jurídicas que simplificam a transmissão de bens e reduzem custos tributários.",
    },
    {
      id: "protecao",
      icon: ShieldCheck,
      title: "Proteção Patrimonial Familiar",
      description: "Estruturas jurídicas para proteger o patrimônio da família contra riscos externos e garantir a segurança das gerações futuras.",
      details: "Criação de holdings familiares e blindagem patrimonial ética, focada na longevidade dos ativos conquistados pela família.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#003366] to-[#004080] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="animate-slideInLeft">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Direito de <span className="text-[#FF9900]">Família & Sucessões</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Soluções jurídicas humanizadas para proteger o que você tem de mais valioso: sua família e seu patrimônio.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="p-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover-lift group animate-slideInUp scroll-mt-32"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-[#FF9900]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#FF9900] transition-all duration-500">
                      <Icon className="text-[#FF9900] group-hover:text-white transition-colors" size={32} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-[#003366] dark:text-white mb-6 group-hover:text-[#FF9900] transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-l-4 border-[#FF9900]">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {service.details}
                        </p>
                      </div>
                      <div className="mt-10">
                        <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-[#003366] dark:bg-[#FF9900] text-white rounded-full px-10 py-6 text-lg hover-glow hover-lift">
                            Agendar Consultoria
                            <ArrowRight className="ml-2" size={20} />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
