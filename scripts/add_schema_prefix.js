const fs = require('fs');
const path = require('path');

const repoDir = path.join(__dirname, '../src/repositories');
const files = fs.readdirSync(repoDir);

files.forEach(filename => {
    if (!filename.endsWith('Repository.js')) return;

    const filepath = path.join(repoDir, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Skip if already processed to prevent double prefixing
    if (content.includes('const s = config.db.schema;')) {
        console.log('Skipping ' + filename + ' (already prefixed)');
        return;
    }

    // Attempt to inject Schema Config require block below Model/DB requires
    const lines = content.split('\n');
    let dbRequireIdx = -1;
    let modelRequireIdx = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("require('../services/db.service')")) dbRequireIdx = i;
        if (lines[i].includes("require('../models/")) modelRequireIdx = i;
    }

    const injectionIdx = Math.max(dbRequireIdx, modelRequireIdx) + 1;

    lines.splice(injectionIdx, 0,
        "const config = require('../config');",
        "const s = config.db.schema;"
    );

    content = lines.join('\n');

    // Convert string literals to Template literals ONLY in QUERIES block
    const queriesBlockMatch = content.match(/const QUERIES = \{([\s\S]*?)\};/);
    if (queriesBlockMatch) {
        let queryBlockText = queriesBlockMatch[1];

        // Replace single quotes with backticks to support template injection
        // Using a regex to carefully replace quotes matching the start/end of the sql query
        queryBlockText = queryBlockText.replace(/:\s*'([^']*)'/g, ': `$1`');

        // Array of SQL keywords that precede a table name
        const keywords = ['FROM', 'INTO', 'UPDATE', 'JOIN'];

        keywords.forEach(kw => {
            // Regex to match keyword followed by word chars. 
            // Negative lookahead to ensure we don't double inject if \${s} is already there
            const regex = new RegExp('\\b' + kw + '\\s+(?!\\$\\{s\\}\\.)([A-Za-z0-9_]+)', 'g');
            queryBlockText = queryBlockText.replace(regex, kw + ' ${s}.$1');
        });

        content = content.replace(queriesBlockMatch[1], queryBlockText);
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log('Prefixed ' + filename);
});

console.log('Schema Prefix iteration complete.');
