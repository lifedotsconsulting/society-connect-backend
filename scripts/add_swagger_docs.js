const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, '../src/routes');

const filesToAnnotate = [
    'society.routes.js', 'society-member.routes.js', 'role.routes.js', 'role-permission.routes.js',
    'important-contact.routes.js', 'notice.routes.js', 'document.routes.js', 'notification.routes.js',
    'complaint-category.routes.js', 'complaint-comment.routes.js',
    'financial-data.routes.js', 'maintenance-config.routes.js', 'maintenance-cycle.routes.js',
    'maintenance-bill.routes.js', 'maintenance-payment.routes.js', 'maintenance-ledger.routes.js',
    'one-time-collection.routes.js', 'one-time-collection-flat.routes.js',
    'audit.routes.js', 'subscription.routes.js', 'plan.routes.js'
];

function generateSwaggerForFile(filename) {
    const entityNameDash = filename.replace('.routes.js', '');

    // Convert dash case to PascalCase for Schema name
    const schemaName = entityNameDash
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

    // Convert dash case to Plural title case for Tag name
    let tagName = entityNameDash
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    // Pluralize simple words
    if (!tagName.endsWith('s') && !tagName.endsWith('Data')) {
        if (tagName.endsWith('y')) tagName = tagName.slice(0, -1) + 'ies';
        else tagName += 's';
    }

    const endpointPath = entityNameDash === 'complaint-comment' ? '' : `/${tagName.toLowerCase().replace(/ /g, '-')}`;

    let swaggerTemplate = `
/**
 * @swagger
 * components:
 *   schemas:
 *     ${schemaName}:
 *       type: object
 *       properties:
 *         identity:
 *           type: string
 *         isActive:
 *           type: boolean
 *           default: true
 *       example:
 *         identity: "a1b2c3d4"
 *         isActive: true
 * tags:
 *   name: ${tagName}
 *   description: ${tagName} Management API
 */

/**
 * @swagger
 * ${endpointPath}:
 *   post:
 *     summary: Create a new ${schemaName}
 *     tags: [${tagName}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${schemaName}'
 *     responses:
 *       201:
 *         description: The ${schemaName} was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${schemaName}'
 *   get:
 *     summary: Get all ${tagName}
 *     tags: [${tagName}]
 *     responses:
 *       200:
 *         description: List of all ${tagName}
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/${schemaName}'
 */

/**
 * @swagger
 * ${endpointPath}/{id}:
 *   get:
 *     summary: Get a ${schemaName} by ID
 *     tags: [${tagName}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ${schemaName} description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${schemaName}'
 *       404:
 *         description: The ${schemaName} was not found
 *   put:
 *     summary: Update a ${schemaName} by ID
 *     tags: [${tagName}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${schemaName}'
 *     responses:
 *       200:
 *         description: The ${schemaName} was updated successfully
 *       404:
 *         description: The ${schemaName} was not found
 *   delete:
 *     summary: Delete a ${schemaName} by ID
 *     tags: [${tagName}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The ${schemaName} was deleted
 *       404:
 *         description: The ${schemaName} was not found
 */
`;

    return swaggerTemplate;
}

filesToAnnotate.forEach(filename => {
    const filepath = path.join(routesDir, filename);
    if (!fs.existsSync(filepath)) {
        console.warn('File not found: ' + filepath);
        return;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Skip if already contains swagger
    if (content.includes('@swagger')) {
        console.log('Skipping ' + filename + ' (already annotated)');
        return;
    }

    const swaggerDocs = generateSwaggerForFile(filename);

    // Inject right after router definition
    const routerDefIndex = content.indexOf('const router = express.Router();');
    if (routerDefIndex !== -1) {
        // Find the end of that line, maybe the next line
        const injectionPoint = content.indexOf('\n', routerDefIndex) + 1;

        const newContent = content.slice(0, injectionPoint) + swaggerDocs + content.slice(injectionPoint);
        fs.writeFileSync(filepath, newContent, 'utf8');
        console.log('Annotated ' + filename);
    } else {
        console.warn('Could not find router definition in ' + filename);
    }
});
console.log('Swagger annotation complete.');
