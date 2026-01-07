import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { Button } from "@/components/ui/button";
import { BRAND_WHATSAPP } from "@/const";
import { ArrowRight, Shield, Briefcase, Scale, Lock } from "lucide-react";

export default function ParaEmpresas() {
  const services = [
    {
      id: "compliance",
      icon: Shield,
      title: "Compliance e Gestão Ambiental",
      description: "Estruturação, revisão e adequação de Programa de Compliance, inclusive com monitoramento e execução de treinamentos. Gestão Ambiental.",
      details: "Especialização em programas de compliance corporativo, adequação à LGPD, ESG e preparação para participação em licitações públicas.",
    },
    {
      id: "administrativo",
      icon: Scale,
      title: "Direito Administrativo e Regulatório",
      description: "Expertise no direito administrativo consultivo, na obtenção de licenças, na participação em licitações.",
      details: "Atuação especializada em direito regulatório, com foco em telecomunicações, criptoativos, bancário e financeiro.",
    },
    {
      id: "empresarial",
      icon: Briefcase,
      title: "Direito Empresarial",
      description: "Estruturação e desenvolvimento de negócios com análise em seus diversos aspectos jurídicos.",
      details: "Consultoria completa para estruturação de novos negócios e execução do desenvolvimento estratégico com visão jurídica integrada.",
    },
    {
      id: "protecao",
      icon: Lock,
      title: "Proteção Patrimonial",
      description: "Estratégias jurídicas para blindagem e preservação do patrimônio empresarial e dos sócios.",
      details: "Implementação de holdings, acordos de sócios e estruturas jurídicas que garantem a continuidade do negócio e a segurança dos ativos.",
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
              Soluções <span className="text-[#FF9900]">Para Empresas</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Advocacia estratégica focada em resultados, segurança jurídica e crescimento sustentável do seu negócio.
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
