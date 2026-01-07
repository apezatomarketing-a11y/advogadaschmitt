-- Schema simplificado para o banco de dados Supabase (PostgreSQL)
-- Execute este script no SQL Editor do Supabase

-- Remover tabelas se existirem para garantir criação limpa (OPCIONAL)
-- DROP TABLE IF EXISTS users, admin_users, publications, leads, practice_areas CASCADE;

-- Tabela de usuários OAuth
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  openid VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginmethod VARCHAR(64),
  role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
  createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  lastsignedin TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  passwordhash TEXT NOT NULL,
  name TEXT,
  active INTEGER DEFAULT 1 NOT NULL,
  createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
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
  coverimage VARCHAR(512),
  published INTEGER DEFAULT 0 NOT NULL,
  publishedat TIMESTAMP WITH TIME ZONE,
  createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de leads (contatos)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  source VARCHAR(100),
  createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de áreas de atuação
CREATE TABLE IF NOT EXISTS practice_areas (
  id SERIAL PRIMARY KEY,
  titlept VARCHAR(255) NOT NULL,
  titleen VARCHAR(255),
  descriptionpt TEXT,
  descriptionen TEXT,
  icon VARCHAR(100),
  sort_order INTEGER DEFAULT 0 NOT NULL,
  createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Função para atualizar o timestamp de updatedat
CREATE OR REPLACE FUNCTION update_updatedat_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedat = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updatedat
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trig_users_updatedat') THEN
        CREATE TRIGGER trig_users_updatedat BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trig_admin_users_updatedat') THEN
        CREATE TRIGGER trig_admin_users_updatedat BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trig_publications_updatedat') THEN
        CREATE TRIGGER trig_publications_updatedat BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trig_practice_areas_updatedat') THEN
        CREATE TRIGGER trig_practice_areas_updatedat BEFORE UPDATE ON practice_areas FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();
    END IF;
END $$;

-- Inserir usuário administrador padrão
-- Email: advVieiraSchmitt@vieira-schmitt.com.br
-- Senha: V$3ir@Schmitt2025!Adv
-- Hash gerado: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
INSERT INTO admin_users (email, passwordhash, name, active)
VALUES (
  'advVieiraSchmitt@vieira-schmitt.com.br',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  'Administrador Vieira Schmitt',
  1
)
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name,
    active = EXCLUDED.active,
    updatedat = CURRENT_TIMESTAMP;

-- Verificar tabelas criadas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verificar usuário admin criado
SELECT id, email, name, active, createdat FROM admin_users;
