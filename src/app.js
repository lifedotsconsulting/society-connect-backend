const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');
const app = express();

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// v1 api routes
app.use('/api/v1', routes);

// Swagger Documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger specification as JSON manually just in case
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Serve static files from the frontend build
const frontendPath = path.join(__dirname, '/www');
app.use(express.static(frontendPath));

// Handle Angular routing for known non-API HTML routes
app.get(/^(?!\/api\/|\/api-docs|\/api-docs-json).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Handle unknown API routes
app.use('/api', (req, res, next) => {
    res.status(404).json({ error: 'Endpoint Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
