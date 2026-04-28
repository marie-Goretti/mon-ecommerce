const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon E-Commerce API',
      version: '1.0.0',
      description: 'API REST complète pour l\'application e-commerce',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Développement' },
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
  apis: ['./src/routes/*.js'], // Swagger lira les commentaires dans tes routes
};

module.exports = swaggerJsdoc(options);