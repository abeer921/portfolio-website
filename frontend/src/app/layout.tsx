import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abeer Nisar | Premium UI/UX Designer Portfolio',
  description: 'Portfolio of Abeer Nisar, UI/UX Designer & Content Developer. Crafting premium, minimal luxury digital products and interactive user experiences.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Abeer Nisar | UI/UX Designer Portfolio',
    description: 'Sleek, minimalist, premium UI/UX design case studies and projects.',
    url: '/',
    siteName: 'Abeer Nisar Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="font-body bg-[#08080a] text-zinc-100 antialiased selection:bg-[#d4af37]/25 selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111114',
                color: '#f4f4f7',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
