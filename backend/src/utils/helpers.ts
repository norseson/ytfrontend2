import { sanitize } from 'sanitize-filename';

export function generateFileName(title: string, format: string): string {
  const timestamp = Date.now();
  const sanitizedTitle = sanitize(title).slice(0, 50);
  return `${sanitizedTitle}-${timestamp}.${format}`;
}