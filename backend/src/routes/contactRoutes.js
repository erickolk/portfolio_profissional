import express from 'express';
import rateLimit from 'express-rate-limit';
import { createContact, testEndpoint } from '../controllers/contactController.js';

const router = express.Router();

// Rate limiter específico para contato (mais restritivo)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 envios por IP
  message: 'Muitos envios de formulário. Por favor, aguarde alguns minutos.'
});

// Rotas
router.get('/test', testEndpoint);
router.post('/', contactLimiter, createContact);

export default router;

