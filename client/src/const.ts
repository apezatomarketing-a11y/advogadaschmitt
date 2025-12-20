export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};


// Configurações da marca
export const BRAND_NAME = "Vieira Schmitt Advocacia";
export const BRAND_DESCRIPTION = "Advocacia Estratégica para Empresários que Valorizam Segurança Jurídica e Resultados";
export const BRAND_PHONE = "(11) 96770-9888";
export const BRAND_EMAIL = "contato@vieiraschmitt.com.br";
export const BRAND_WHATSAPP = "https://wa.me/5511967709888?text=Olá, gostaria de agendar uma consultoria";

// Cores da marca
export const COLORS = {
  primary: "#003366", // Azul Marinho
  secondary: "#FF9900", // Laranja/Ouro
  accent: "#0099CC", // Azul Turquesa
  light: "#F5F5F5",
  dark: "#1A1A1A",
};

// Links de navegação
export const NAV_ITEMS = [
  { name: "Início", path: "/" },
  { name: "Áreas de Atuação", path: "/areas" },
  { name: "Sobre Nós", path: "/sobre" },
  { name: "Contato", path: "/contato" },
  { name: "Publicações", path: "/publicacoes" },
];

// Redes sociais
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/vieira-schmitt-advocacia",
  instagram: "https://www.instagram.com/vieiraschmittadvocacia",
  whatsapp: BRAND_WHATSAPP,
};
