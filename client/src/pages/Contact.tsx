import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { Button } from "@/components/ui/button";
import { BRAND_PHONE, BRAND_EMAIL, BRAND_WHATSAPP } from "@/const";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const createLeadMutation = trpc.leads.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      createLeadMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#003366] to-[#0099CC] text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Estamos prontos para ajudar seu negócio. Envie uma mensagem ou ligue para nós.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#003366] mb-6">
                Envie uma Mensagem
              </h2>
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                    placeholder="(11) 98765-4321"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                    placeholder="Sua mensagem aqui..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createLeadMutation.status === "pending"}
                  className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
                >
                  {createLeadMutation.status === "pending" ? "Enviando..." : "Enviar Mensagem"}
                  <Send size={18} />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#003366] mb-6">
                Informações de Contato
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FF9900]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="text-[#FF9900]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003366] mb-1">
                      Telefone
                    </h3>
                    <a
                      href={`tel:${BRAND_PHONE}`}
                      className="text-gray-600 hover:text-[#FF9900] transition-colors"
                    >
                      {BRAND_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FF9900]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="text-[#FF9900]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003366] mb-1">
                      E-mail
                    </h3>
                    <a
                      href={`mailto:${BRAND_EMAIL}`}
                      className="text-gray-600 hover:text-[#FF9900] transition-colors"
                    >
                      {BRAND_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FF9900]/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="text-[#FF9900]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003366] mb-1">
                      Localização
                    </h3>
                    <p className="text-gray-600">
                      São Paulo, SP<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#003366] text-white rounded-lg">
                  <h3 className="font-semibold mb-3">Horário de Atendimento</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Segunda a Sexta: 09:00 - 18:00
                  </p>
                  <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-500 text-white hover:bg-green-600 rounded-lg">
                      Enviar Mensagem via WhatsApp
                    </Button>
                  </a>
                </div>
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
