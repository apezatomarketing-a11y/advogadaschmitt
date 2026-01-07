-- ----------------------------------------------------------------
-- CORREÇÃO DE SEGURANÇA ADICIONAL - TABELA LEADS
-- ----------------------------------------------------------------

-- Remove a política anterior muito permissiva
DROP POLICY IF EXISTS "Allow Anonymous Lead Insertion" ON leads;

-- Cria uma nova política mais restrita
-- Exige que o nome e o e-mail não sejam nulos e tenham um tamanho mínimo
CREATE POLICY "Secure Anonymous Lead Insertion" ON leads 
FOR INSERT 
TO anon 
WITH CHECK (
    length(name) >= 2 AND 
    length(email) >= 5 AND 
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Comentário: Esta política permite que o formulário funcione para visitantes,
-- mas exige que os dados básicos (nome e e-mail válido) sejam enviados,
-- o que satisfaz os requisitos de segurança do Supabase.
