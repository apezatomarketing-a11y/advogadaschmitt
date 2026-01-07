-- Schema completo para o banco de dados Supabase (PostgreSQL)
-- Execute este script no SQL Editor do Supabase

-- Tabela de usuários OAuth
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  "openId" VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  "loginMethod" VARCHAR(64),
  role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "lastSignedIn" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  name TEXT,
  active INTEGER DEFAULT 1 NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de publicações (blog)
CREATE TABLE IF NOT EXISTS publications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  tags TEXT,
  "coverImage" VARCHAR(512),
  published INTEGER DEFAULT 0 NOT NULL,
  "publishedAt" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de leads (contatos)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  source VARCHAR(100),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de áreas de atuação
CREATE TABLE IF NOT EXISTS practice_areas (
  id SERIAL PRIMARY KEY,
  "titlePt" VARCHAR(255) NOT NULL,
  "titleEn" VARCHAR(255),
  "descriptionPt" TEXT,
  "descriptionEn" TEXT,
  icon VARCHAR(100),
  "order" INTEGER DEFAULT 0 NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Função para atualizar o timestamp de updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updatedAt
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
        CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_users_updated_at') THEN
        CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_publications_updated_at') THEN
        CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_practice_areas_updated_at') THEN
        CREATE TRIGGER update_practice_areas_updated_at BEFORE UPDATE ON practice_areas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Inserir usuário administrador padrão
-- Email: advVieiraSchmitt@vieira-schmitt.com.br
-- Senha: V$3ir@Schmitt2025!Adv
-- Hash gerado: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
INSERT INTO admin_users (email, "passwordHash", name, active)
VALUES (
  'advVieiraSchmitt@vieira-schmitt.com.br',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  'Administrador Vieira Schmitt',
  1
)
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name,
    active = EXCLUDED.active,
    "updatedAt" = CURRENT_TIMESTAMP;

-- Verificar tabelas criadas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verificar usuário admin criado
SELECT id, email, name, active, "createdAt" FROM admin_users;
