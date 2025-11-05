import bcrypt from 'bcrypt';
import { query } from '../db/connection.js';
import { generateToken } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

// Login
export const login = async (req, res, next) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      throw new AppError('Senha é obrigatória', 400);
    }
    
    // Comparar com senha do ambiente
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      throw new AppError('Configuração de senha admin não encontrada', 500);
    }
    
    // Verificar senha
    const isValid = password === adminPassword; // Para produção, use bcrypt.compare
    
    if (!isValid) {
      throw new AppError('Senha inválida', 401);
    }
    
    // Gerar token
    const token = generateToken({ role: 'admin' });
    
    res.json({
      success: true,
      token,
      expiresIn: '7d'
    });
  } catch (error) {
    next(error);
  }
};

// Listar todos os leads
export const getLeads = async (req, res, next) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let queryText = 'SELECT * FROM leads';
    const params = [];
    
    if (status) {
      queryText += ' WHERE status = $1';
      params.push(status);
    }
    
    queryText += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);
    
    const result = await query(queryText, params);
    
    res.json({
      success: true,
      leads: result.rows,
      total: result.rowCount
    });
  } catch (error) {
    next(error);
  }
};

// Obter lead por ID
export const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await query('SELECT * FROM leads WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('Lead não encontrado', 404);
    }
    
    res.json({
      success: true,
      lead: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// Atualizar status do lead
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['new', 'contacted', 'proposal_sent', 'closed', 'lost'];
    
    if (!validStatuses.includes(status)) {
      throw new AppError('Status inválido', 400);
    }
    
    const result = await query(
      'UPDATE leads SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      throw new AppError('Lead não encontrado', 404);
    }
    
    res.json({
      success: true,
      lead: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// Deletar lead
export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM leads WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('Lead não encontrado', 404);
    }
    
    res.json({
      success: true,
      message: 'Lead deletado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// Listar todos os cases (incluindo não publicados)
export const getAllCases = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM cases ORDER BY created_at DESC');
    
    res.json({
      success: true,
      cases: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// Criar case
export const createCase = async (req, res, next) => {
  try {
    const {
      slug,
      title,
      subtitle,
      category,
      problem,
      solution,
      architectureSvg,
      techStack,
      process: processSteps,
      results,
      kpis,
      imageUrl,
      published
    } = req.body;
    
    const result = await query(
      `INSERT INTO cases 
       (slug, title, subtitle, category, problem, solution, architecture_svg, tech_stack, process, results, kpis, image_url, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        slug,
        title,
        subtitle,
        category,
        problem,
        solution,
        architectureSvg,
        JSON.stringify(techStack),
        JSON.stringify(processSteps),
        JSON.stringify(results),
        JSON.stringify(kpis),
        imageUrl,
        published || false
      ]
    );
    
    res.status(201).json({
      success: true,
      case: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// Atualizar case
export const updateCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Construir query dinâmica
    const fields = [];
    const values = [];
    let paramCount = 1;
    
    Object.keys(updates).forEach(key => {
      if (key === 'techStack' || key === 'process' || key === 'results' || key === 'kpis') {
        fields.push(`${key} = $${paramCount}`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
      }
      paramCount++;
    });
    
    values.push(id);
    
    const result = await query(
      `UPDATE cases SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`,
      values
    );
    
    if (result.rows.length === 0) {
      throw new AppError('Case não encontrado', 404);
    }
    
    res.json({
      success: true,
      case: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// Deletar case
export const deleteCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM cases WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('Case não encontrado', 404);
    }
    
    res.json({
      success: true,
      message: 'Case deletado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// Gerar proposta em PDF
export const generateProposal = async (req, res, next) => {
  try {
    const { leadId } = req.params;
    const puppeteer = await import('puppeteer');
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { dirname } = await import('path');
    
    // Buscar lead
    const result = await query('SELECT * FROM leads WHERE id = $1', [leadId]);
    
    if (result.rows.length === 0) {
      throw new AppError('Lead não encontrado', 404);
    }
    
    const lead = result.rows[0];
    
    // Ler template HTML
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const templatePath = path.join(__dirname, '../templates/proposta.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
    
    // Mapear tipo de projeto para prazo estimado
    const deadlineMap = {
      'sistema': '45-60',
      'site': '15-30',
      'automacao': '20-40',
      'curso': '10-20',
      'consultoria': '15-30',
      'outro': '30-45'
    };
    
    // Substituir variáveis no template
    const replacements = {
      leadName: lead.name || 'Cliente',
      leadCompany: lead.company || 'Não informado',
      leadEmail: lead.email || '',
      leadPhone: lead.phone || '',
      projectType: lead.project_type || 'Não especificado',
      projectDescription: lead.description || 'Aguardando detalhamento',
      estimatedDeadline: deadlineMap[lead.project_type] || '30-45',
      investment: 'A definir conforme escopo',
      whatsappNumber: process.env.WHATSAPP_NUMBER || '(82) 99999-9999',
      currentDate: new Date().toLocaleDateString('pt-BR')
    };
    
    Object.keys(replacements).forEach(key => {
      htmlTemplate = htmlTemplate.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    });
    
    // Gerar PDF com Puppeteer
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });
    
    await browser.close();
    
    // Retornar PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="proposta-${leadId}.pdf"`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    next(error);
  }
};

