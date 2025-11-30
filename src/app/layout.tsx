import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ConvexClientProvider } from '@/components/convex-client-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts';
import { SkipToContent } from '@/components/accessibility';
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Word Editor Tools - Free Online Text Editing & Analysis Tools',
  description: 'Free online word counter, character counter, typing test, text analyzer, and more. Professional text editing tools for writers, students, and content creators.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EJKE8GN1N9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EJKE8GN1N9');
            `,
          }}
        />
      </head>
      {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipToContent />
          <NuqsAdapter>
            <ConvexClientProvider>
              <main id="main-content">{children}</main>
            </ConvexClientProvider>
          </NuqsAdapter>
          <KeyboardShortcuts />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
