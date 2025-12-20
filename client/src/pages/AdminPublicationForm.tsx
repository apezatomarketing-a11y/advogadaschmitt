import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Save } from "lucide-react";

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
    description: "",
    content: "",
    author: "Dra. Patrícia Vieira Schmitt",
    tags: "",
    coverImage: "",
    published: 0,
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
        description: publication.description || "",
        content: publication.content,
        author: publication.author,
        tags: publication.tags || "",
        coverImage: publication.coverImage || "",
        published: publication.published,
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
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const payload = {
      ...formData,
      tags: JSON.stringify(tagsArray),
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
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/admin")}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-[#003366]">
            {isEditing ? "Editar Publicação" : "Nova Publicação"}
          </h1>
        </div>
      </header>

      {/* Form */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                placeholder="Título da publicação"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                URL (Slug) *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                placeholder="url-da-publicacao"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                placeholder="Descrição breve da publicação"
              />
            </div>

            {/* Conteúdo */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Conteúdo (Markdown) *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] font-mono text-sm"
                placeholder="Conteúdo em Markdown..."
              />
            </div>

            {/* Autor */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Autor *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                placeholder="Nome do autor"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                placeholder="compliance, direito-empresarial, saúde"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                URL da Imagem de Capa
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            {/* Publicado */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published === 1}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]"
              />
              <label className="text-sm font-medium text-gray-900">
                Publicar agora
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-lg px-8 py-3 font-semibold flex items-center gap-2"
            >
              <Save size={18} />
              {isSubmitting
                ? "Salvando..."
                : isEditing
                ? "Atualizar Publicação"
                : "Criar Publicação"}
            </Button>
            <button
              type="button"
              onClick={() => setLocation("/admin")}
              className="px-8 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
