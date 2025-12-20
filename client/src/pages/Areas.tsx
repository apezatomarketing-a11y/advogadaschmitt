import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { BRAND_WHATSAPP } from "@/const";

const areas = [
  {
    id: 1,
    title: "Compliance e Gestão Ambiental",
    description: "Estruturação, revisão e adequação de Programa de Compliance, inclusive com monitoramento e execução de treinamentos. Gestão Ambiental.",
    details: "Especialização em programas de compliance corporativo, adequação à LGPD, ESG e preparação para participação em licitações públicas.",
  },
  {
    id: 2,
    title: "Direito Administrativo e Regulatório",
    description: "Expertise no direito administrativo consultivo, na obtenção de licenças, na participação em licitações.",
    details: "Atuação especializada em direito regulatório, com foco em telecomunicações, criptoativos, bancário e financeiro.",
  },
  {
    id: 3,
    title: "Direito Empresarial",
    description: "Estruturação e desenvolvimento de negócios com análise em seus diversos aspectos jurídicos.",
    details: "Consultoria completa para estruturação de novos negócios e execução do desenvolvimento estratégico com visão jurídica integrada.",
  },
  {
    id: 4,
    title: "Penal e Direito Administrativo Sancionador",
    description: "Estudo de soluções e atuação em temas relacionados ao direito penal e direito processual penal.",
    details: "Defesa em inquéritos civis, ações de improbidade, processos disciplinares e sindicâncias administrativas.",
  },
  {
    id: 5,
    title: "Negociação e Contratos",
    description: "Desenvolvimento e negociação de Contratos com visão estratégica e proteção de interesses.",
    details: "Elaboração, revisão e negociação de contratos comerciais, trabalhistas e administrativos.",
  },
  {
    id: 6,
    title: "Proteção de Dados e Direito Digital",
    description: "Adequação à LGPD, contencioso de proteção de dados, DPO as a Service, due diligence.",
    details: "Consultoria em contratos eletrônicos, tecnologia, criptoassets e startups com foco em conformidade digital.",
  },
  {
    id: 7,
    title: "Direito à Saúde e Cannabis Medicinal",
    description: "Garantia de medicamentos de alto custo, tratamentos para doenças raras, autismo e suporte jurídico para Cannabis Medicinal.",
    details: "Judicialização humanizada para garantir qualidade de vida, participação em grupos médicos e educação sobre prescrição ética.",
  },
];

export default function Areas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  const filteredAreas = areas.filter(
    (area) =>
      area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#003366] to-[#0099CC] text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Áreas de Atuação
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Soluções jurídicas completas e especializadas para todos os seus desafios empresariais
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar áreas de atuação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas.map((area) => (
              <div
                key={area.id}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
              >
                <h3 className="text-lg font-bold text-[#003366] mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {area.description}
                </p>
                {selectedArea === area.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 text-sm">
                      {area.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredAreas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Nenhuma área encontrada. Tente outra busca.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#003366] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Precisa de Consultoria Jurídica?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Agende uma consultoria gratuita com a Dra. Patrícia Schmitt e descubra como podemos ajudar seu negócio.
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
