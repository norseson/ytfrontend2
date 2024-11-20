import { Suspense } from 'react';
import { Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Converter } from '@/components/converter';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <Youtube className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold">YT Converter</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://github.com/yourusername/youtube-converter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            </Button>
            <ModeToggle />
          </div>
        </nav>

        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Convert YouTube Videos to{' '}
            <span className="text-primary">MP3</span> or{' '}
            <span className="text-primary">MP4</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Fast, free, and easy to use. No registration required.
          </p>
        </section>

        <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
          <Converter />
        </Suspense>

        <footer className="mt-24 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} YT Converter. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}