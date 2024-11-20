import { unlink, readdir } from 'fs/promises';
import { join } from 'path';
import { logger } from './logger';

const DOWNLOADS_DIR = join(process.cwd(), 'downloads');
const MAX_AGE = 60 * 60 * 1000; // 1 hour in milliseconds

async function cleanup() {
  try {
    const files = await readdir(DOWNLOADS_DIR);
    const now = Date.now();

    for (const file of files) {
      const filePath = join(DOWNLOADS_DIR, file);
      const stats = await fs.stat(filePath);

      if (now - stats.mtimeMs > MAX_AGE) {
        await unlink(filePath);
        logger.info(`Cleaned up file: ${file}`);
      }
    }
  } catch (error) {
    logger.error('Cleanup error:', error);
  }
}

export function setupCleanup() {
  // Run cleanup every hour
  setInterval(cleanup, MAX_AGE);
  
  // Run initial cleanup
  cleanup();
}