export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://erickoliveira.dev'
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/about',
    '/services',
    '/projects',
    '/cursos',
    '/contact'
  ]
  
  // Páginas dinâmicas (cases) - poderia buscar do banco de dados
  const dynamicPages = [
    '/projects/evolutech-crm',
    '/projects/automacao-fiscal-arapiraca',
    '/projects/guardiao-digital',
    '/projects/saas-negocios-locais',
    '/projects/integracao-banco-cora',
    '/projects/app-checagem-sintomas'
  ]
  
  const allPages = [...staticPages, ...dynamicPages]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`
  
  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})

