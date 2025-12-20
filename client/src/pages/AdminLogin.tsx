import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: (data) => {
      // Armazenar token no localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.email);
      localStorage.setItem("adminName", data.name || "");
      setLocation("/admin");
    },
    onError: (error) => {
      setError(error.message || "Erro ao fazer login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#0099CC] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8 animate-fadeIn">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#003366] mb-2">
              Vieira Schmitt
            </h1>
            <p className="text-gray-600">Painel Administrativo</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] transition-all"
                placeholder="seu@email.com"
                disabled={loginMutation.status === "pending"}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] transition-all"
                placeholder="••••••••"
                disabled={loginMutation.status === "pending"}
              />
            </div>

            <Button
              type="submit"
              disabled={loginMutation.status === "pending"}
              className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <LogIn size={18} />
              {loginMutation.status === "pending" ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Credenciais de Acesso:</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Email: <code className="bg-gray-100 px-2 py-1 rounded">advVieiraSchmitt@vieira-schmitt.com.br</code>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Senha: <code className="bg-gray-100 px-2 py-1 rounded">V$3ir@Schmitt2025!Adv</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white">
          <p className="text-sm opacity-80">
            © 2025 Vieira Schmitt Advocacia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
