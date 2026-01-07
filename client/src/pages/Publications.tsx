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
      <section className="pt-40 pb-24 px-4 bg-[#003366] text-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="animate-slideInLeft">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl leading-relaxed">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((publication) => (
                <Link key={publication.id} href={`/publicacoes/${publication.slug}`}>
                  <a className="group">
                    <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover-lift flex flex-col animate-slideInUp shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Foto do Post */}
                      <div className="h-56 bg-gray-100 overflow-hidden relative">
                        {publication.featuredImage ? (
                          <img
                            src={publication.featuredImage}
                            alt={publication.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#003366]/5">
                            <span className="text-[#003366]/20 font-bold text-4xl">VS</span>
                          </div>
                        )}
                      </div>

                      <div className="p-8 flex flex-col flex-grow">
                        {/* Título */}
                        <h3 className="text-xl font-bold text-[#003366] mb-3 line-clamp-2 group-hover:text-[#FF9900] transition-colors leading-tight">
                          {publication.title}
                        </h3>
                        
                        {/* Subtítulo (Description) */}
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                          {publication.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Postado em</span>
                            <span className="text-xs text-gray-600 font-medium">
                              {new Date(publication.publishedAt || publication.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Por</span>
                            <span className="text-xs text-gray-600 font-medium">
                              {publication.author}
                            </span>
                          </div>
                        </div>
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
