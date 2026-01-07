import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BRAND_WHATSAPP, BRAND_DESCRIPTION } from "@/const";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { ArrowRight, Shield, Briefcase, Heart, Scale } from "lucide-react";

export default function Home() {
  const practiceAreas = [
    {
      icon: Shield,
      title: "Compliance e Gestão Ambiental",
      description: "Estruturação de programas de compliance, LGPD, ESG e preparação para mercado público.",
      link: "/para-empresas#compliance"
    },
    {
      icon: Briefcase,
      title: "Direito Empresarial e Contratos",
      description: "Elaboração e revisão de contratos, consultoria para empresas, gestão de riscos jurídicos.",
      link: "/para-empresas#empresarial"
    },
    {
      icon: Heart,
      title: "Direito à Saúde e Cannabis Medicinal",
      description: "Garantia de medicamentos de alto custo, tratamentos para doenças raras e autismo.",
      link: "/saude#cannabis"
    },
    {
      icon: Scale,
      title: "Judicialização Humanizada",
      description: "Remoção de barreiras burocráticas para garantir qualidade de vida aos pacientes.",
      link: "/saude#humanizada"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 bg-[#003366] dark:bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slideInLeft">
              <div className="inline-block px-4 py-2 bg-[#FF9900]/20 rounded-full">
                <span className="text-[#FF9900] text-sm font-bold tracking-wider uppercase">Advocacia Estratégica</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Segurança Jurídica para <span className="text-[#FF9900]">Empresários</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                {BRAND_DESCRIPTION}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full px-10 py-7 text-lg font-bold hover-lift hover-glow">
                    Agendar Consultoria
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </a>
                <Link href="/sobre">
                  <a>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366] rounded-full px-10 py-7 text-lg font-bold hover-lift">
                      Conheça o Escritório
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-fadeIn">
              <img
                src="/images/logo.png"
                alt="Vieira Schmitt Advocacia"
                className="w-full max-w-md mx-auto opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-105 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-32 px-4 bg-gray-50 dark:bg-gray-900/50 relative">

        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] dark:text-white mb-6">
              Áreas de Atuação
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Soluções jurídicas completas para empresários que buscam segurança e crescimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Link key={index} href={area.link}>
                  <div
                    className="p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover-lift group cursor-pointer animate-slideInUp border border-transparent hover:border-[#FF9900]/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-[#FF9900]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#FF9900] transition-all duration-500">
                      <Icon className="text-[#FF9900] group-hover:text-white transition-colors" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#003366] dark:text-white mb-4 group-hover:text-[#FF9900] transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-base leading-relaxed">
                      {area.description}
                    </p>
                    <div className="text-[#FF9900] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                      Saiba mais <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/areas">
              <a>
                <Button className="bg-[#003366] text-white hover:bg-[#003366]/90 rounded-full px-8 hover-lift hover-glow">
                  Ver Todas as Áreas
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
                Sobre a Dra. Patrícia Schmitt
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Com uma carreira sólida de mais de 20 anos, a Dra. Patrícia Schmitt consolidou sua trajetória na advocacia através de uma atuação executiva estratégica em grandes multinacionais e instituições financeiras.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Formada pela PUC-Rio com especialização em Direito Empresarial, sua experiência foi forjada em ambientes altamente regulados, onde liderou decisões críticas e estabeleceu interfaces diretas com órgãos reguladores.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Essa vivência permite que hoje, à frente da Vieira Schmitt Advocacia, ela ofereça aos seus clientes não apenas conformidade legal, mas uma visão prática e econômica indispensável para o sucesso de qualquer negócio.
              </p>
              <Link href="/sobre">
                <a>
                  <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full px-8 hover-lift hover-glow">
                    Saiba Mais
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-[#003366] to-[#0099CC] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Experiência</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF9900] font-bold">✓</span>
                    <span>Mais de 20 anos em multinacionais e instituições financeiras</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF9900] font-bold">✓</span>
                    <span>Graduação em Direito pela PUC-Rio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF9900] font-bold">✓</span>
                    <span>Especialização em Direito Empresarial</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF9900] font-bold">✓</span>
                    <span>Experiência internacional (JMLS-Chicago)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#003366] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Proteger e Impulsionar seu Negócio?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Agende uma consultoria gratuita e descubra como podemos ajudar sua empresa a crescer com segurança jurídica.
          </p>
          <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full px-12 py-6 text-lg hover-lift hover-glow">
              Agendar Consultoria Agora
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
