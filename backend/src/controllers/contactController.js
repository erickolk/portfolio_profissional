import { z } from 'zod';
import { query } from '../db/connection.js';
import { sendContactEmail, sendNotificationEmail } from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';

// Schema de validação
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Tipo de projeto é obrigatório'),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
});

export const createContact = async (req, res, next) => {
  try {
    // Validar dados
    const validatedData = contactSchema.parse(req.body);

    // Verificar honeypot (se tiver)
    if (req.body.honeypot && req.body.honeypot !== '') {
      // Silenciosamente rejeitar (provável spam)
      return res.json({ success: true, message: 'Mensagem recebida' });
    }

    // Sanitizar dados
    const { name, email, phone, company, projectType, description } = validatedData;

    // Inserir no banco de dados
    const result = await query(
      `INSERT INTO leads 
       (name, email, phone, company, project_type, description, status, source) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, created_at`,
      [name, email, phone, company || null, projectType, description, 'new', 'website']
    );

    const leadId = result.rows[0].id;

    // Enviar e-mail de confirmação para o lead
    try {
      await sendContactEmail({
        to: email,
        name,
        projectType
      });
    } catch (emailError) {
      console.error('Erro ao enviar e-mail de confirmação:', emailError);
      // Não falhar a requisição se o e-mail falhar
    }

    // Enviar e-mail de notificação para o admin
    try {
      await sendNotificationEmail({
        leadId,
        name,
        email,
        phone,
        company,
        projectType,
        description
      });
    } catch (emailError) {
      console.error('Erro ao enviar e-mail de notificação:', emailError);
    }

    // Retornar sucesso
    res.status(201).json({
      success: true,
      message: 'Contato recebido com sucesso!',
      leadId
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: error.errors.map(e => ({
          field: e.path[0],
          message: e.message
        }))
      });
    }
    next(error);
  }
};

export const testEndpoint = async (req, res) => {
  res.json({
    success: true,
    message: 'Endpoint de contato funcionando',
    timestamp: new Date().toISOString()
  });
};

