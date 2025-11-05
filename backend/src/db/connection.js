import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuração do pool de conexões PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // número máximo de clientes no pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Evento de erro do pool
pool.on('error', (err) => {
  console.error('Erro inesperado no cliente PostgreSQL:', err);
  process.exit(-1);
});

// Testar conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err);
  } else {
    console.log('✅ Conectado ao PostgreSQL:', res.rows[0].now);
  }
});

// Helper para queries
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query executada:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Erro na query:', error);
    throw error;
  }
};

// Helper para transações
export const getClient = async () => {
  const client = await pool.connect();
  const query = client.query.bind(client);
  const release = client.release.bind(client);
  
  // Wrap release para logar
  const wrappedRelease = () => {
    console.log('Cliente liberado de volta ao pool');
    return release();
  };
  
  client.release = wrappedRelease;
  
  return { client, query, release: wrappedRelease };
};

export default pool;

