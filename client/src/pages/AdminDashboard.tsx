import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Plus, Edit2, Trash2, Eye, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [adminName, setAdminName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const name = localStorage.getItem("adminName");
    if (!token) {
      setLocation("/admin/login");
      return;
    }
    setAdminName(name || "Admin");
    setIsAuthenticated(true);
  }, [setLocation]);

  const { data: publications = [], isLoading, refetch } = trpc.publications.listAll.useQuery();
  const deletePublicationMutation = trpc.publications.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    setLocation("/");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta publicação?")) {
      deletePublicationMutation.mutate({ id });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#003366]">
              Painel Administrativo
            </h1>
            <p className="text-sm text-gray-600">
              Bem-vindo, {adminName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Publicações</h2>
          <Link href="/admin/publicacoes/nova">
            <a>
              <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-lg flex items-center gap-2">
                <Plus size={18} />
                Nova Publicação
              </Button>
            </a>
          </Link>
        </div>

        {/* Publications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Carregando publicações...</p>
            </div>
          ) : publications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">
                Nenhuma publicação criada ainda.
              </p>
              <Link href="/admin/publicacoes/nova">
                <a className="text-[#FF9900] hover:text-[#FF9900]/90 font-semibold">
                  Criar primeira publicação
                </a>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Autor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {publications.map((pub) => (
                    <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {pub.title}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {pub.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(new Date(pub.publishedAt || pub.createdAt))}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            pub.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {pub.published ? "Publicada" : "Rascunho"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/publicacoes/${pub.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Visualizar"
                          >
                            <Eye size={18} />
                          </a>
                          <Link href={`/admin/publicacoes/${pub.id}/editar`}>
                            <a className="p-2 text-[#FF9900] hover:bg-[#FF9900]/10 rounded-lg transition-colors" title="Editar">
                              <Edit2 size={18} />
                            </a>
                          </Link>
                          <button
                            onClick={() => handleDelete(pub.id)}
                            disabled={deletePublicationMutation.status === "pending"}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Deletar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
