import * as path from 'path';
import * as fs from 'fs';

export function getSecretsPath(fileName: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Dynamically determine base path depending on development or production environment
  const basePath = isProduction
    ? path.resolve('./src/config','./.keys') // development
    : '/etc/secrets'     // production

  const fullPath = path.join(basePath, fileName);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: Secret file not found at ${fullPath}`);
  }

  return fullPath;
}