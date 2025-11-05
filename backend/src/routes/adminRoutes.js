import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { 
  login,
  getLeads, 
  getLeadById, 
  updateLeadStatus, 
  deleteLead,
  getAllCases,
  createCase,
  updateCase,
  deleteCase,
  generateProposal
} from '../controllers/adminController.js';

const router = express.Router();

// Rota de login (não protegida)
router.post('/login', login);

// Rotas de leads (protegidas)
router.get('/leads', requireAuth, getLeads);
router.get('/leads/:id', requireAuth, getLeadById);
router.put('/leads/:id', requireAuth, updateLeadStatus);
router.delete('/leads/:id', requireAuth, deleteLead);

// Rotas de cases (protegidas)
router.get('/cases', requireAuth, getAllCases);
router.post('/cases', requireAuth, createCase);
router.put('/cases/:id', requireAuth, updateCase);
router.delete('/cases/:id', requireAuth, deleteCase);

// Rota de geração de proposta (protegida)
router.get('/proposal/:leadId', requireAuth, generateProposal);

export default router;

