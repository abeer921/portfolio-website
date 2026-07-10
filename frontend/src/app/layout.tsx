import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from '@/components/ui/SmoothScroll';
import SiteChrome from '@/components/shared/SiteChrome';
import { ThemeProvider } from '@/context/ThemeContext';
import { CmsProvider } from '@/context/CmsContext';
import CmsHead from '@/components/shared/CmsHead';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Abeer Nisar | UI/UX Designer Portfolio',
  description: 'Portfolio of Abeer Nisar — UI/UX designer crafting meaningful digital experiences.',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body bg-theme text-[var(--foreground)] antialiased theme-transition">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light');}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          <CmsProvider>
            <CmsHead />
            <SmoothScroll>
              <SiteChrome>{children}</SiteChrome>
              <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'theme-transition',
                style: {
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </SmoothScroll>
          </CmsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
