# Variáveis de Ambiente para Netlify

Configure estas variáveis no painel do Netlify em: **Site settings > Environment variables**

## Banco de Dados

```
DATABASE_URL
mysql://avnadmin:AVNS_password@mysql-project.aivencloud.com:port/defaultdb?ssl-mode=REQUIRED
```
**NOTA:** Substitua pela URL de conexão do seu banco MySQL/TiDB. Para Supabase, use a connection string do PostgreSQL adaptada.

## Supabase

```
SUPABASE_PROJECT_URL
https://mguqyhucdlbqkozccxld.supabase.co
```

```
SUPABASE_PROJECT_ID
mguqyhucdlbqkozccxld
```

```
SUPABASE_ANON_PUBLIC_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndXF5aHVjZGxicWtvemNjeGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzM2NjAsImV4cCI6MjA4MzMwOTY2MH0.XC5zE23wvjFdwRfD7hcQkKELfc08yAi45EKFerUFsTU
```

```
SUPABASE_PUBLISHABLE_KEY
sb_publishable_BM9qQUNfKMY-C56SfQ21jg_WWXSfZ8w
```

```
SUPABASE_SECRET_KEY
sb_secret_Vj_f81WQWt2exzG-TnBrzA_nhsf_b8e
```

```
SUPABASE_SERVICE_ROLE_SECRET
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndXF5aHVjZGxicWtvemNjeGxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzczMzY2MCwiZXhwIjoyMDgzMzA5NjYwfQ.zL1QO0h6FVqmNyxjDbvu2IL6wThKYbLSPXDgm9ACEss
```

## Segurança

```
JWT_SECRET
5lcUVK8x1J8hEXuDYtClB04FehwiFss5KIG/x6StLm8D46Lp7I3STIf2P6PKOrb3CvM+IKGAjEFzNLdnm98tOw==
```

## Google APIs

```
GEMINI_API_KEY
AIzaSyAE1UGSJh5DyELXYUOykW0VLxRz4N1rrwM
```

```
GOOGLE_CLOUD_API_KEY
AIzaSyBWF6dba6a2_Ok1Tx43-uoTfnBQUJ7YYdk
```

## Google OAuth (se necessário)

```
GOOGLE_OAUTH_CLIENT_ID
(seu_client_id_aqui)
```

```
GOOGLE_OAUTH_CLIENT_SECRET
(seu_client_secret_aqui)
```

## Email (Resend)

```
RESEND_API_KEY
re_2hURxqzX_3FaWfxZjiWpGUWsmCWKf6zgA
```

## Aplicação (Frontend)

```
VITE_APP_TITLE
Vieira Schmitt Advocacia
```

```
VITE_APP_LOGO
/images/logo.png
```

```
VITE_APP_ID
vieira-schmitt-advocacia
```

## OAuth Server (se usado)

```
OAUTH_SERVER_URL
https://oauth.manus.im
```

```
OWNER_NAME
Vieira Schmitt
```

```
OWNER_OPEN_ID
(seu_open_id_aqui)
```

## Built-in Forge API (se usado)

```
BUILT_IN_FORGE_API_KEY
(sua_chave_aqui)
```

```
BUILT_IN_FORGE_API_URL
https://api.forge.manus.im
```

```
VITE_FRONTEND_FORGE_API_KEY
(sua_chave_frontend_aqui)
```

```
VITE_FRONTEND_FORGE_API_URL
https://api.forge.manus.im
```

## Analytics (se usado)

```
VITE_ANALYTICS_ENDPOINT
(seu_endpoint_aqui)
```

```
VITE_ANALYTICS_WEBSITE_ID
(seu_website_id_aqui)
```

```
VITE_OAUTH_PORTAL_URL
https://portal.manus.im
```

---

## Instruções de Configuração

1. Acesse o painel do Netlify
2. Vá em **Site settings > Environment variables**
3. Clique em **Add a variable**
4. Cole o **nome** e o **valor** de cada variável acima
5. Selecione **All scopes** e **Same value in all deploy contexts**
6. Clique em **Create variable**
7. Repita para todas as variáveis necessárias

## Observações Importantes

- **DATABASE_URL**: Se estiver usando Supabase como banco de dados, você precisa obter a connection string PostgreSQL no painel do Supabase
- **JWT_SECRET**: Usado para hash de senhas, mantenha seguro
- **RESEND_API_KEY**: Para envio de emails de contato
- As variáveis com prefixo `VITE_` são expostas no frontend
- Variáveis sem prefixo são usadas apenas no backend/serverless functions
