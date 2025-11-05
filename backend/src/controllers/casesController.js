import { query } from '../db/connection.js';
import { AppError } from '../middleware/errorHandler.js';

// Listar cases publicados
export const listCases = async (req, res, next) => {
  try {
    const { category } = req.query;
    
    let queryText = 'SELECT * FROM cases WHERE published = true';
    const params = [];
    
    if (category && category !== 'all') {
      queryText += ' AND LOWER(category) = LOWER($1)';
      params.push(category);
    }
    
    queryText += ' ORDER BY created_at DESC';
    
    const result = await query(queryText, params);
    
    res.json({
      success: true,
      cases: result.rows.map(row => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        subtitle: row.subtitle,
        category: row.category,
        image: row.image_url,
        techStack: row.tech_stack,
        kpis: row.kpis
      }))
    });
  } catch (error) {
    next(error);
  }
};

// Obter um case específico por slug
export const getCaseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const result = await query(
      'SELECT * FROM cases WHERE slug = $1 AND published = true',
      [slug]
    );
    
    if (result.rows.length === 0) {
      throw new AppError('Case não encontrado', 404);
    }
    
    const caseData = result.rows[0];
    
    res.json({
      success: true,
      case: {
        id: caseData.id,
        slug: caseData.slug,
        title: caseData.title,
        subtitle: caseData.subtitle,
        category: caseData.category,
        problem: caseData.problem,
        solution: caseData.solution,
        architectureSvg: caseData.architecture_svg,
        techStack: caseData.tech_stack,
        process: caseData.process,
        results: caseData.results,
        kpis: caseData.kpis,
        image: caseData.image_url
      }
    });
  } catch (error) {
    next(error);
  }
};

