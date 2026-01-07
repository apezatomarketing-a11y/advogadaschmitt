-- Script para criar usuário administrador no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela admin_users se não existir
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  name TEXT,
  active INT DEFAULT 1 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Inserir usuário administrador
-- Email: advVieiraSchmitt@vieira-schmitt.com.br
-- Senha: V$3ir@Schmitt2025!Adv
-- Hash gerado com SHA256 + JWT_SECRET

INSERT INTO admin_users (email, passwordHash, name, active)
VALUES (
  'advVieiraSchmitt@vieira-schmitt.com.br',
  SHA2(CONCAT('V$3ir@Schmitt2025!Adv', COALESCE((SELECT value FROM environment_variables WHERE name = 'JWT_SECRET'), 'secret')), 256),
  'Administrador Vieira Schmitt',
  1
)
ON DUPLICATE KEY UPDATE
  passwordHash = SHA2(CONCAT('V$3ir@Schmitt2025!Adv', COALESCE((SELECT value FROM environment_variables WHERE name = 'JWT_SECRET'), 'secret')), 256),
  name = 'Administrador Vieira Schmitt',
  active = 1,
  updatedAt = CURRENT_TIMESTAMP;

-- Verificar se o usuário foi criado
SELECT id, email, name, active, createdAt FROM admin_users WHERE email = 'advVieiraSchmitt@vieira-schmitt.com.br';
