import { Router } from 'express';
import { validateUrl } from '../middleware/validate';
import { convertVideo } from '../services/converter';
import { logger } from '../utils/logger';
import { CustomError } from '../utils/errors';

const router = Router();

router.post('/', validateUrl, async (req, res, next) => {
  try {
    const { url, format } = req.body;
    
    if (!['mp3', 'mp4'].includes(format)) {
      throw new CustomError('Invalid format specified', 400);
    }

    const downloadUrl = await convertVideo(url, format);
    logger.info(`Successfully converted video: ${url} to ${format}`);
    
    res.json({ downloadUrl });
  } catch (error) {
    next(error);
  }
});

export const convertRouter = router;