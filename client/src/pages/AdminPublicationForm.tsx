import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

export default function AdminPublicationForm() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [match, params] = useRoute("/admin/publicacoes/:id/editar");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
      return;
    }
    setIsAuthenticated(true);
  }, [setLocation]);

  const publicationId = params?.id ? parseInt(params.id) : null;
  const isEditing = !!match && !!publicationId;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "", // Usado como Subtítulo
    content: "",
    author: "Dra. Vieira Schmitt",
    tags: "",
    coverImage: "",
    published: 1,
  });

  const { data: publication } = trpc.publications.getById.useQuery(
    { id: publicationId || 0 },
    { enabled: !!(isEditing && publicationId) }
  );

  const createMutation = trpc.publications.create.useMutation({
    onSuccess: () => {
      setLocation("/admin");
    },
  });

  const updateMutation = trpc.publications.update.useMutation({
    onSuccess: () => {
      setLocation("/admin");
    },
  });

  // Preencher formulário ao editar
  useEffect(() => {
    if (publication) {
      setFormData({
        title: publication.title,
        slug: publication.slug,
        description: publication.excerpt || "",
        content: publication.content,
        author: publication.author || "Dra. Vieira Schmitt",
        tags: publication.tags || "",
        coverImage: publication.featuredImage || "",
        published: publication.status === "published" ? 1 : 0,
      });
    }
  }, [publication]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.description,
      content: formData.content,
      author: formData.author,
      featuredImage: formData.coverImage,
      status: formData.published ? "published" : "draft",
      publishedAt: new Date(),
    };

    if (isEditing && publicationId) {
      updateMutation.mutate({
        id: publicationId,
        ...payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isSubmitting =
    createMutation.status === "pending" || updateMutation.status === "pending";

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/admin")}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-[#003366]">
              {isEditing ? "Editar Post Blog" : "Criar Post Blog"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocation("/admin")}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-lg px-6 py-2 font-semibold flex items-center gap-2"
            >
              <Save size={18} />
              {isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Criar post-blog"}
            </Button>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Título do Post-Blog *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-lg font-medium"
                  placeholder="Digite o título principal..."
                />
              </div>

              {/* Subtítulo */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subtítulo (Breve descrição) *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                  placeholder="Uma breve descrição que aparece no card do blog..."
                />
              </div>

              {/* Conteúdo */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Texto do Blog *
                  </label>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <LinkIcon size={12} /> Suporta links e imagens
                    </span>
                  </div>
                </div>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] font-sans leading-relaxed"
                  placeholder="Escreva o conteúdo completo do seu post aqui. Você pode incluir links e referências a imagens..."
                />
                <p className="mt-2 text-xs text-gray-500">
                  Dica: O texto aceita formatação básica e links automáticos.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Imagem de Capa */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Imagem de Capa
              </label>
              
              <div 
                className={`relative aspect-video rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden bg-gray-50 group transition-all ${formData.coverImage ? 'border-none' : 'hover:border-[#FF9900]/50'}`}
              >
                {formData.coverImage ? (
                  <>
                    <img 
                      src={formData.coverImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                        className="bg-white text-red-600 px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Remover
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-xs text-gray-500">Insira a URL da imagem abaixo</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
            </div>

            {/* Configurações Adicionais */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  URL amigável (Slug)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-sm bg-gray-50"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published === 1}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {formData.published ? "Publicado" : "Rascunho"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
