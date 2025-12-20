import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { Button } from "@/components/ui/button";
import { BRAND_WHATSAPP } from "@/const";
import { ArrowRight, Award, Users, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#003366] to-[#0099CC] text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre Nós
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Conheça a história e a expertise da Vieira Schmitt Advocacia
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
                Dra. Patrícia Schmitt
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Com uma carreira sólida de mais de 20 anos, a Dra. Patrícia Schmitt consolidou sua trajetória na advocacia através de uma atuação executiva estratégica em grandes multinacionais e instituições financeiras.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Formada pela PUC-Rio com especialização em Direito Empresarial, sua experiência foi forjada em ambientes altamente regulados, onde liderou decisões críticas, geriu crises e estabeleceu interfaces diretas com órgãos reguladores.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Essa vivência "dentro do jogo" permite que hoje, à frente da Vieira Schmitt Advocacia, ela ofereça aos seus clientes não apenas conformidade legal, mas uma visão prática e econômica indispensável para o sucesso de qualquer negócio.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#003366] to-[#0099CC] rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Formação e Experiência</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Award className="text-[#FF9900] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Graduação em Direito</p>
                    <p className="text-sm text-gray-200">PUC-Rio</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-[#FF9900] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Especialização em Direito Empresarial</p>
                    <p className="text-sm text-gray-200">INSPER</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-[#FF9900] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Experiência Internacional</p>
                    <p className="text-sm text-gray-200">JMLS-Chicago</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-[#FF9900] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Mais de 20 anos</p>
                    <p className="text-sm text-gray-200">Em multinacionais e instituições financeiras</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gray-50 rounded-lg p-12 mb-20">
            <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  Ética
                </h3>
                <p className="text-gray-700">
                  Atuamos com total transparência e responsabilidade em todas as nossas ações.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  Humanização
                </h3>
                <p className="text-gray-700">
                  Compreendemos as necessidades reais dos nossos clientes e suas famílias.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  Resultados
                </h3>
                <p className="text-gray-700">
                  Nosso compromisso é entregar soluções práticas e eficazes para seus desafios.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-[#003366] text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Nossa Missão
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Construir relações de parceria, confiança e credibilidade com nossos clientes, atuando de forma simples sem perder a excelência, sempre com ética, transparência e responsabilidade. Oferecemos não apenas conformidade legal, mas uma visão estratégica que impulsiona o crescimento sustentável dos negócios.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
            Conheça Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Descubra como a Vieira Schmitt Advocacia pode ajudar seu negócio a crescer com segurança jurídica.
          </p>
          <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full px-12 py-6 text-lg">
              Agendar Consultoria
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
