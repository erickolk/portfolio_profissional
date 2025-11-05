import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verificar configuração
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erro na configuração do e-mail:', error);
  } else {
    console.log('✅ Servidor de e-mail pronto');
  }
});

// Template de e-mail de confirmação para o lead
const getContactEmailTemplate = (name, projectType) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contato Recebido - Erick Oliveira</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #3b82f6; margin-bottom: 20px; }
    .highlight { background-color: #f0f7ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; }
    .button { display: inline-block; padding: 12px 30px; background-color: #3b82f6; color: #ffffff !important; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Olá, ${name}! 👋</h1>
    
    <p>Obrigado por entrar em contato! Recebi sua mensagem sobre <strong>${projectType}</strong> e vou analisá-la com atenção.</p>
    
    <div class="highlight">
      <p><strong>📋 Próximos passos:</strong></p>
      <ul>
        <li>Vou revisar sua solicitação nas próximas 24 horas</li>
        <li>Retornarei por e-mail ou WhatsApp</li>
        <li>Podemos agendar uma conversa de 15 minutos se preferir</li>
      </ul>
    </div>
    
    <p>Se quiser acelerar o processo, você pode agendar uma conversa comigo agora:</p>
    
    <a href="${process.env.CALENDLY_LINK || 'https://calendly.com'}" class="button">
      🗓️ Agendar Conversa de 15min
    </a>
    
    <p>Ou me chame diretamente no WhatsApp: <strong>${process.env.WHATSAPP_NUMBER || '(82) 99999-9999'}</strong></p>
    
    <div class="footer">
      <p>
        <strong>Erick Oliveira</strong><br>
        Desenvolvedor Full Stack<br>
        📍 Arapiraca, AL - Brasil<br>
        💼 <a href="${process.env.SITE_URL || 'https://erickoliveira.dev'}">erickoliveira.dev</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

// Template de notificação para o admin
const getNotificationEmailTemplate = (leadData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Novo Lead Recebido</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; }
    h1 { color: #3b82f6; }
    .info { background: #f9fafb; padding: 15px; border-radius: 5px; margin: 10px 0; }
    .label { font-weight: bold; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 Novo Lead Recebido!</h1>
    
    <div class="info">
      <p><span class="label">Nome:</span> ${leadData.name}</p>
      <p><span class="label">E-mail:</span> ${leadData.email}</p>
      <p><span class="label">Telefone:</span> ${leadData.phone}</p>
      ${leadData.company ? `<p><span class="label">Empresa:</span> ${leadData.company}</p>` : ''}
      <p><span class="label">Tipo de Projeto:</span> ${leadData.projectType}</p>
      <p><span class="label">Lead ID:</span> ${leadData.leadId}</p>
    </div>
    
    <div class="info">
      <p><span class="label">Descrição:</span></p>
      <p>${leadData.description}</p>
    </div>
    
    <p><strong>Ação recomendada:</strong> Entre em contato nas próximas 24 horas.</p>
  </div>
</body>
</html>
`;

// Enviar e-mail de confirmação para o lead
export const sendContactEmail = async ({ to, name, projectType }) => {
  const mailOptions = {
    from: `"Erick Oliveira" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Contato Recebido - Erick Oliveira',
    html: getContactEmailTemplate(name, projectType)
  };

  return await transporter.sendMail(mailOptions);
};

// Enviar e-mail de notificação para o admin
export const sendNotificationEmail = async (leadData) => {
  const mailOptions = {
    from: `"Portfolio System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `🎯 Novo Lead: ${leadData.name} - ${leadData.projectType}`,
    html: getNotificationEmailTemplate(leadData)
  };

  return await transporter.sendMail(mailOptions);
};

export default transporter;

