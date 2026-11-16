const { cpSync, mkdirSync, readdirSync, rmSync } = require('node:fs');
const { basename, join } = require('node:path');

const outputName = 'public-site';
const output = join(__dirname, outputName);
const excluded = new Set([outputName, '_todo', 'node_modules', 'vercel.json']);
const signedCompanyCard = join(__dirname, 'files', 'nzmo-kartochka-predpriyatiya-podpis.pdf');
const isPublic = (path) => {
  const name = basename(path);
  return !name.startsWith('.') && !excluded.has(name) && path !== signedCompanyCard;
};

rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const name of readdirSync(__dirname).filter(isPublic)) {
  cpSync(join(__dirname, name), join(output, name), { recursive: true, filter: isPublic });
}
