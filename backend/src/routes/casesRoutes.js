import express from 'express';
import { listCases, getCaseBySlug } from '../controllers/casesController.js';

const router = express.Router();

// Rotas públicas
router.get('/', listCases);
router.get('/:slug', getCaseBySlug);

export default router;

