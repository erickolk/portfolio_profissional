-- Criar extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Leads (Contatos)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para leads
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Tabela de Cases (Projetos)
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  category VARCHAR(100) NOT NULL,
  problem TEXT,
  solution TEXT,
  architecture_svg TEXT,
  tech_stack JSONB,
  process JSONB,
  results JSONB,
  kpis JSONB,
  image_url VARCHAR(500),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para cases
CREATE INDEX IF NOT EXISTS idx_cases_slug ON cases(slug);
CREATE INDEX IF NOT EXISTS idx_cases_category ON cases(category);
CREATE INDEX IF NOT EXISTS idx_cases_published ON cases(published);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentários das tabelas
COMMENT ON TABLE leads IS 'Tabela de leads/contatos recebidos pelo site';
COMMENT ON TABLE cases IS 'Tabela de cases/projetos do portfólio';

-- Valores padrão para status de leads
-- 'new', 'contacted', 'proposal_sent', 'closed', 'lost'

