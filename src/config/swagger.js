const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const config = require('./index');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Society Connect API',
            version: '1.0.0',
            description: 'API documentation for the Society Connect backend services',
        },
        servers: [
            {
                url: `http://localhost:${config.port}/api/v1`,
                description: 'Development server',
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
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.js')], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
