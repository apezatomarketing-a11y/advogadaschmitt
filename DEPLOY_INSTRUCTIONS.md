# Instruções de Deploy - Vieira Schmitt Advocacia

## 📋 Alterações Implementadas

### ✅ Melhorias Visuais e UX
1. **Rodapé Atualizado**
   - Adicionado crédito "Desenvolvido por Apezato Marketing" com link clicável para www.apezatomarketing.com.br
   - Link destacado em laranja (#FF9900) com efeito hover

2. **Botão "Voltar ao Topo"**
   - Novo componente `ScrollToTopButton.tsx` criado
   - Posicionado no canto inferior esquerdo (seguindo padrão Apezato)
   - Cor verde (#00B37E) com animação suave
   - Aparece após rolar 300px

3. **Google Maps Funcional**
   - Mapa integrado na página de contato
   - Localização: Av. Paulista, São Paulo (ajustar conforme necessário)
   - Altura de 450px, responsivo

### ✅ Credenciais Atualizadas
Arquivo `.env` criado com as seguintes credenciais ATUALIZADAS:

#### Supabase (NOVO)
- URL: `https://mguqyhucdlbqkozccxld.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (atualizada)
- Service Role Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (atualizada)

#### Google APIs (NOVO)
- Google Cloud API Key: `AIzaSyBWF6dba6a2_Ok1Tx43-uoTfnBQUJ7YYdk`
- Gemini API Key: `AIzaSyAE1UGSJh5DyELXYUOykW0VLxRz4N1rrwM`

#### Resend (Email Transacional)
- API Key: `re_2hURxqzX_3FaWfxZjiWpGUWsmCWKf6zgA`

#### Google OAuth
- Client ID: `[CONFIGURAR NO NETLIFY]`
- Client Secret: `[CONFIGURAR NO NETLIFY]`

## 🚀 Deploy no Netlify

### Passo 1: Configurar Variáveis de Ambiente no Netlify

Acesse o painel do Netlify e adicione as seguintes variáveis de ambiente:

```
DATABASE_URL=mysql://user:password@host:port/database
SUPABASE_URL=https://mguqyhucdlbqkozccxld.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndXF5aHVjZGxicWtvemNjeGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzM2NjAsImV4cCI6MjA4MzMwOTY2MH0.XC5zE23wvjFdwRfD7hcQkKELfc08yAi45EKFerUFsTU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndXF5aHVjZGxicWtvemNjeGxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzczMzY2MCwiZXhwIjoyMDgzMzA5NjYwfQ.zL1QO0h6FVqmNyxjDbvu2IL6wThKYbLSPXDgm9ACEss
GOOGLE_CLOUD_API_KEY=AIzaSyBWF6dba6a2_Ok1Tx43-uoTfnBQUJ7YYdk
GEMINI_API_KEY=AIzaSyAE1UGSJh5DyELXYUOykW0VLxRz4N1rrwM
RESEND_API_KEY=re_2hURxqzX_3FaWfxZjiWpGUWsmCWKf6zgA
GOOGLE_OAUTH_CLIENT_ID=[OBTER_DO_CONSOLE_GOOGLE]
GOOGLE_OAUTH_CLIENT_SECRET=[OBTER_DO_CONSOLE_GOOGLE]
JWT_SECRET=vieira-schmitt-secret-2025
OWNER_OPEN_ID=admin-vieira-schmitt
NODE_ENV=production
```

### Passo 2: Build Settings no Netlify

- **Build command**: `pnpm install && pnpm run build`
- **Publish directory**: `dist`
- **Node version**: 18 ou superior

### Passo 3: Deploy Automático

O deploy será automático após o push para o GitHub. O Netlify detectará as mudanças e fará o build automaticamente.

## 🔐 Acesso Admin

**URL**: `/admin/login`

**Credenciais**:
- Login: `advVieiraSchmitt@vieira-schmitt.com.br`
- Senha: `V$3ir@Schmitt2025!Adv`

**NOTA**: O painel admin foi gerado anteriormente mas estava com problemas de acesso. Verifique se o login está funcionando após o deploy.

## 📝 Próximos Passos (Opcional)

1. **Ajustar localização no Google Maps**
   - Editar arquivo `client/src/pages/Contact.tsx`
   - Substituir URL do iframe pelo endereço correto do escritório

2. **Configurar DATABASE_URL**
   - Obter credenciais do banco MySQL
   - Atualizar variável de ambiente no Netlify

3. **Testar funcionalidades**
   - Formulário de contato
   - Sistema de publicações (blog)
   - Painel admin

4. **Otimizações futuras**
   - Adicionar Google Analytics
   - Implementar dark mode (opcional)
   - Adicionar mais animações (fade-in, slide-in)
   - Gerar imagens profissionais com IA

## 🎨 Referências de Design

O site foi desenvolvido seguindo as melhores práticas do site **Apezato Marketing** (www.apezatomarketing.com.br) como referência, incluindo:

- Botões com efeitos hover
- Animações suaves
- Layout responsivo
- Cores profissionais
- Tipografia clara
- Espaçamento generoso

## 📞 Contato para Suporte

Para questões técnicas ou ajustes adicionais, entre em contato com:
- **Apezato Marketing**: contato@apezatomarketing.com.br
- **WhatsApp**: (12) 99189-5547

---

**Desenvolvido por Apezato Marketing** 🚀
