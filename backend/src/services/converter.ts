import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { promisify } from 'util';
import { CustomError } from '../utils/errors';
import { logger } from '../utils/logger';
import { generateFileName } from '../utils/helpers';

const DOWNLOADS_DIR = join(process.cwd(), 'downloads');

export async function convertVideo(url: string, format: 'mp3' | 'mp4'): Promise<string> {
  try {
    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      throw new CustomError('Invalid YouTube URL', 400);
    }

    // Get video info
    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title;
    
    // Generate safe filename
    const fileName = generateFileName(videoTitle, format);
    const outputPath = join(DOWNLOADS_DIR, fileName);

    if (format === 'mp3') {
      return await convertToMp3(url, outputPath);
    } else {
      return await convertToMp4(url, outputPath);
    }
  } catch (error) {
    logger.error('Conversion error:', error);
    throw new CustomError('Failed to convert video', 500);
  }
}

async function convertToMp3(url: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: 'highestaudio' });
    
    ffmpeg(stream)
      .toFormat('mp3')
      .audioBitrate(192)
      .on('end', () => resolve(`/downloads/${outputPath}`))
      .on('error', reject)
      .save(outputPath);
  });
}

async function convertToMp4(url: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: 'highest' });
    
    stream.pipe(createWriteStream(outputPath))
      .on('finish', () => resolve(`/downloads/${outputPath}`))
      .on('error', reject);
  });
}