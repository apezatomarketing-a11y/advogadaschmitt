import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Publications() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Buscar publicações
  const { data: publications = [], isLoading } = trpc.publications.list.useQuery();

  // Extrair tags únicas
  const allTags = Array.from(
    new Set(
      publications
        .flatMap((pub) => {
          try {
            return pub.tags ? JSON.parse(pub.tags) : [];
          } catch {
            return [];
          }
        })
    )
  ) as string[];

  // Filtrar publicações por tag
  const filteredPublications = selectedTag
    ? publications.filter((pub) => {
        try {
          const tags = pub.tags ? JSON.parse(pub.tags) : [];
          return tags.includes(selectedTag);
        } catch {
          return false;
        }
      })
    : publications;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 bg-gradient-header text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="animate-slideInLeft">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Conheça as últimas análises jurídicas e insights sobre direito empresarial, compliance e saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="py-8 px-4 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto max-w-6xl">
            <p className="text-sm font-semibold text-gray-700 mb-4">Filtrar por tema:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === null
                    ? "bg-[#FF9900] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-[#FF9900]"
                }`}
              >
                Todos
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? "bg-[#FF9900] text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-[#FF9900]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Carregando publicações...</p>
            </div>
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {selectedTag
                  ? "Nenhuma publicação encontrada com este tema."
                  : "Nenhuma publicação disponível no momento."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((publication) => (
                <Link key={publication.id} href={`/publicacoes/${publication.slug}`}>
                  <a className="group">
                    <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover-lift flex flex-col animate-slideInUp">
                      {publication.coverImage && (
                        <div className="h-48 bg-gradient-to-br from-[#003366] to-[#0099CC] overflow-hidden">
                          <img
                            src={publication.coverImage}
                            alt={publication.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-[#003366] mb-2 line-clamp-2 group-hover:text-[#FF9900] transition-colors">
                          {publication.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {publication.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(new Date(publication.publishedAt || publication.createdAt))}
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            {publication.author}
                          </div>
                        </div>
                        {publication.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {JSON.parse(publication.tags).map((tag: string) => (
                              <span
                                key={tag}
                                className="text-xs bg-[#FF9900]/10 text-[#FF9900] px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <Button className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-lg text-sm flex items-center justify-center gap-2">
                          Ler Artigo
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
