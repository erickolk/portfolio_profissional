import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

export const requireAuth = (req, res, next) => {
  try {
    // Verificar se o token foi enviado
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Token não fornecido', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-change-me');
    
    // Adicionar informações do usuário à requisição
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Token inválido', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado', 401));
    }
    next(error);
  }
};

export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'secret-key-change-me',
    { expiresIn: '7d' }
  );
};

