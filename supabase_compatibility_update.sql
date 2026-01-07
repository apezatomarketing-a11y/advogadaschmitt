-- Script de Compatibilidade para Supabase
-- Este script atualiza as tabelas que você já tem para funcionarem com o novo site

-- 1. Atualizar admin_users para suportar login por senha
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS passwordhash TEXT;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS active INTEGER DEFAULT 1;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Atualizar leads para compatibilidade
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT;

-- 3. Criar tabela de áreas de atuação (se não existir)
CREATE TABLE IF NOT EXISTS practice_areas (
  id SERIAL PRIMARY KEY,
  titlept VARCHAR(255) NOT NULL,
  titleen VARCHAR(255),
  descriptionpt TEXT,
  descriptionen TEXT,
  icon VARCHAR(100),
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Criar tabela de usuários genérica (para OAuth se necessário)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  openid VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginmethod VARCHAR(64),
  role VARCHAR(20) DEFAULT 'user' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  lastsignedin TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Inserir usuário administrador padrão nas suas tabelas
-- Email: advVieiraSchmitt@vieira-schmitt.com.br
-- Senha: V$3ir@Schmitt2025!Adv
-- Hash: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
INSERT INTO admin_users (email, passwordhash, name, active, role)
VALUES (
  'advVieiraSchmitt@vieira-schmitt.com.br',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  'Administrador Vieira Schmitt',
  1,
  'admin'
)
ON CONFLICT (email) DO UPDATE
SET passwordhash = EXCLUDED.passwordhash,
    name = EXCLUDED.name,
    active = EXCLUDED.active,
    role = 'admin',
    updated_at = NOW();

-- Verificar se as colunas foram adicionadas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'admin_users';
