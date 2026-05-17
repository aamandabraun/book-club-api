const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Caixa do Mundo API',
      version: '1.0.0',
      description: 'Documentação da API da plataforma Caixa do Mundo',
    },
    servers: [
      {
        url: 'https://book-club-api-neou.onrender.com',
        description: 'Produção',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);