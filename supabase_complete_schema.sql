-- Schema completo para o banco de dados Supabase
-- Execute este script no SQL Editor do Supabase

-- Tabela de usuários OAuth
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_openId (openId),
  INDEX idx_email (email)
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  name TEXT,
  active INT DEFAULT 1 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_email (email),
  INDEX idx_active (active)
);

-- Tabela de publicações (blog)
CREATE TABLE IF NOT EXISTS publications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  tags TEXT,
  coverImage VARCHAR(512),
  published INT DEFAULT 0 NOT NULL,
  publishedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_slug (slug),
  INDEX idx_published (published),
  INDEX idx_publishedAt (publishedAt)
);

-- Tabela de leads (contatos)
CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  source VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_email (email),
  INDEX idx_createdAt (createdAt),
  INDEX idx_source (source)
);

-- Tabela de áreas de atuação
CREATE TABLE IF NOT EXISTS practice_areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titlePt VARCHAR(255) NOT NULL,
  titleEn VARCHAR(255),
  descriptionPt TEXT,
  descriptionEn TEXT,
  icon VARCHAR(100),
  `order` INT DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_order (`order`)
);

-- Inserir usuário administrador padrão
-- Email: advVieiraSchmitt@vieira-schmitt.com.br
-- Senha: V$3ir@Schmitt2025!Adv
INSERT INTO admin_users (email, passwordHash, name, active)
VALUES (
  'advVieiraSchmitt@vieira-schmitt.com.br',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  'Administrador Vieira Schmitt',
  1
)
ON DUPLICATE KEY UPDATE
  name = 'Administrador Vieira Schmitt',
  active = 1,
  updatedAt = CURRENT_TIMESTAMP;

-- Verificar tabelas criadas
SHOW TABLES;

-- Verificar usuário admin criado
SELECT id, email, name, active, createdAt FROM admin_users;
