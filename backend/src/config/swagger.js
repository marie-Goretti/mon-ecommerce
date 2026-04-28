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
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', example: 'user' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'iPhone 15' },
            description: { type: 'string', example: 'Smartphone Apple' },
            price: { type: 'number', example: 999.99 },
            image_url: { type: 'string', example: 'https://...' },
            stock: { type: 'integer', example: 10 },
            category: { type: 'string', example: 'Électronique' },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            product_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'iPhone 15' },
            price: { type: 'number', example: 999.99 },
            quantity: { type: 'integer', example: 2 },
            image_url: { type: 'string', example: 'https://...' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Message d\'erreur' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Swagger lira les commentaires dans tes routes
};

module.exports = swaggerJsdoc(options);