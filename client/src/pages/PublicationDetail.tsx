import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { trpc } from "@/lib/trpc";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
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
    const d = new Date(date);
    const dateStr = d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeStr = d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dateStr} às ${timeStr}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-[#003366] text-white">
        <div className="container mx-auto max-w-4xl">
          <Link href="/publicacoes">
            <a className="inline-flex items-center gap-2 text-[#FF9900] hover:text-[#FF9900]/90 font-semibold mb-8 transition-colors">
              <ArrowLeft size={18} />
              Voltar para Publicações
            </a>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {publication.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-blue-100/80">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#FF9900]" />
              <span>
                {formatDate(new Date(publication.publishedAt || publication.createdAt))}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#FF9900]" />
              <span>{publication.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-4xl">
          <article>
            {/* Cover Image */}
            {publication.featuredImage && (
              <div className="mb-12">
                <img
                  src={publication.featuredImage}
                  alt={publication.title}
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Subtitle/Description */}
            {publication.description && (
              <div className="mb-10">
                <p className="text-2xl text-gray-600 font-medium leading-relaxed border-l-4 border-[#FF9900] pl-6">
                  {publication.description}
                </p>
              </div>
            )}

            {/* Main Text */}
            <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-[#003366] prose-a:text-[#FF9900] prose-img:rounded-xl">
              <Streamdown>{publication.content}</Streamdown>
            </div>
          </article>

          {/* Author Info */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {publication.author.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  {publication.author}
                </h3>
                <p className="text-gray-600">
                  Especialista em Direito na Vieira Schmitt Advocacia. Comprometida com a excelência e a defesa dos interesses de nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
