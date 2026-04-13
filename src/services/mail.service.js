const { transporter } = require('../lib/mailer')

async function sendWelcomeEmail(email, name) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Bem-vindo ao Loume Livros!',
    html: `<h1>Olá, ${name}!</h1><p>Sua conta foi criada com sucesso.</p>`,
  })
}

async function sendSubscriptionConfirmationEmail(email, name) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Assinatura confirmada!',
    html: `<h1>Tudo certo, ${name}!</h1><p>Sua assinatura está ativa. Bons livros!</p>`,
  })
}

module.exports = { sendWelcomeEmail, sendSubscriptionConfirmationEmail }