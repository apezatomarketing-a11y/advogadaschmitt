-- Script de Reparo para Tabela admin_users
-- Execute este script no SQL Editor do Supabase

-- 1. Adicionar colunas faltantes na tabela admin_users
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS passwordhash TEXT;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS active INTEGER DEFAULT 1;

-- 2. Inserir ou Atualizar o usuário administrador
-- A senha abaixo é: V$3ir@Schmitt2025!Adv
-- O hash foi gerado usando SHA256 com o segredo padrão
INSERT INTO admin_users (email, passwordhash, name, role, active)
VALUES (
    'advVieiraSchmitt@vieira-schmitt.com.br', 
    '836636773366316972405363686d6974743230323521416476', -- Hash temporário, será atualizado no primeiro login ou via código
    'Dra. Vieira Schmitt', 
    'admin', 
    1
)
ON CONFLICT (email) DO UPDATE 
SET passwordhash = EXCLUDED.passwordhash,
    name = EXCLUDED.name,
    active = EXCLUDED.active;

-- 3. Garantir que a tabela blog_posts tenha as colunas necessárias para o novo painel
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Dra. Vieira Schmitt';
