import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { trpc } from "@/lib/trpc";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";

export default function PublicationDetail() {
  const [match, params] = useRoute("/publicacoes/:slug");

  const { data: publication, isLoading } = trpc.publications.getBySlug.useQuery(
    { slug: params?.slug || "" },
    { enabled: !!params?.slug }
  );

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Carregando artigo...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Artigo não encontrado</p>
            <Link href="/publicacoes">
              <a className="text-[#FF9900] hover:text-[#FF9900]/90 font-semibold">
                Voltar para Publicações
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tags = publication.tags ? JSON.parse(publication.tags) : [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      {publication.coverImage && (
        <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#003366] to-[#0099CC] text-white">
          <div className="container mx-auto max-w-4xl">
            <img
              src={publication.coverImage}
              alt={publication.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 px-4 flex-grow">
        <div className="container mx-auto max-w-4xl">
          <Link href="/publicacoes">
            <a className="flex items-center gap-2 text-[#FF9900] hover:text-[#FF9900]/90 font-semibold mb-8">
              <ArrowLeft size={18} />
              Voltar para Publicações
            </a>
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
                {publication.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>
                    {formatDate(new Date(publication.publishedAt || publication.createdAt))}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{publication.author}</span>
                </div>
              </div>
              {publication.description && (
                <p className="text-lg text-gray-700 italic border-l-4 border-[#FF9900] pl-4">
                  {publication.description}
                </p>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-sm bg-[#FF9900]/10 text-[#FF9900] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-lg max-w-none text-gray-700">
              <Streamdown>{publication.content}</Streamdown>
            </div>
          </article>

          {/* Author Info */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#003366] mb-2">
                Sobre o Autor
              </h3>
              <p className="text-gray-700">
                {publication.author} é especialista em direito empresarial e atua na Vieira Schmitt Advocacia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
