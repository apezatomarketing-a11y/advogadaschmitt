import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { BRAND_NAME, BRAND_EMAIL, BRAND_PHONE, SOCIAL_LINKS } from "@/const";
import { useState } from "react";

export default function Footer() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#003366] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{BRAND_NAME}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Advocacia estratégica para empresários que valorizam segurança jurídica e resultados.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-[#FF9900] transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-[#FF9900] transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Links Rápidos</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/">
                    <a className="text-gray-300 hover:text-[#FF9900] transition-colors">
                      Início
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/sobre">
                    <a className="text-gray-300 hover:text-[#FF9900] transition-colors">
                      Sobre Nós
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/areas">
                    <a className="text-gray-300 hover:text-[#FF9900] transition-colors">
                      Áreas de Atuação
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contato">
                    <a className="text-gray-300 hover:text-[#FF9900] transition-colors">
                      Contato
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6">Serviços</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#compliance" className="text-gray-300 hover:text-[#FF9900] transition-colors">
                    Compliance
                  </a>
                </li>
                <li>
                  <a href="#direito-empresarial" className="text-gray-300 hover:text-[#FF9900] transition-colors">
                    Direito Empresarial
                  </a>
                </li>
                <li>
                  <a href="#saude" className="text-gray-300 hover:text-[#FF9900] transition-colors">
                    Direito à Saúde
                  </a>
                </li>
                <li>
                  <a href="#cannabis" className="text-gray-300 hover:text-[#FF9900] transition-colors">
                    Cannabis Medicinal
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-6">Contato</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="text-[#FF9900] shrink-0 mt-1" />
                  <a
                    href={`tel:${BRAND_PHONE}`}
                    className="text-gray-300 hover:text-[#FF9900] transition-colors"
                  >
                    {BRAND_PHONE}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={20} className="text-[#FF9900] shrink-0 mt-1" />
                  <a
                    href={`mailto:${BRAND_EMAIL}`}
                    className="text-gray-300 hover:text-[#FF9900] transition-colors"
                  >
                    {BRAND_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8 flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-6 text-sm justify-center flex-wrap">
              <button
                onClick={() => setOpenModal("privacy")}
                className="text-gray-300 hover:text-[#FF9900] transition-colors cursor-pointer"
              >
                Política de Privacidade
              </button>
              <span className="text-gray-500">|</span>
              <button
                onClick={() => setOpenModal("terms")}
                className="text-gray-300 hover:text-[#FF9900] transition-colors cursor-pointer"
              >
                Termos de Uso
              </button>
              <span className="text-gray-500">|</span>
              <button
                onClick={() => setOpenModal("cookies")}
                className="text-gray-300 hover:text-[#FF9900] transition-colors cursor-pointer"
              >
                Política de Cookies
              </button>
            </div>
            <p className="text-sm text-gray-400 text-center">
              &copy; {currentYear} {BRAND_NAME}. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-400 text-center mt-2">
              Desenvolvido por{" "}
              <a
                href="https://www.apezatomarketing.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF9900] hover:text-[#FF9900]/80 transition-colors font-medium"
              >
                Apezato Marketing
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {openModal === "privacy" && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#003366]">
                  Política de Privacidade
                </h2>
                <p className="text-gray-700 mb-4">
                  A Vieira Schmitt Advocacia respeita a privacidade de seus usuários e está comprometida em proteger seus dados pessoais. Esta política descreve como coletamos, usamos e protegemos suas informações.
                </p>
                <p className="text-gray-700">
                  Para mais informações, entre em contato conosco através do email {BRAND_EMAIL}.
                </p>
              </div>
            )}
            {openModal === "terms" && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#003366]">
                  Termos de Uso
                </h2>
                <p className="text-gray-700 mb-4">
                  Ao acessar e usar este site, você concorda em estar vinculado pelos termos e condições descritos aqui.
                </p>
                <p className="text-gray-700">
                  O uso deste site é limitado a fins legais e não deve ser usado para fins ilegais ou prejudiciais.
                </p>
              </div>
            )}
            {openModal === "cookies" && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#003366]">
                  Política de Cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  Este site usa cookies para melhorar sua experiência de navegação. Os cookies são pequenos arquivos armazenados no seu dispositivo.
                </p>
                <p className="text-gray-700">
                  Você pode controlar o uso de cookies através das configurações do seu navegador.
                </p>
              </div>
            )}
            <button
              onClick={() => setOpenModal(null)}
              className="mt-6 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#003366]/90 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
