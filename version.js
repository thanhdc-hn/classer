import fs from 'fs';

const version = Date.now(); // or git commit hash

fs.writeFileSync('public/version.json', JSON.stringify({ version }, null, 2));

console.log('Build version:', version);
