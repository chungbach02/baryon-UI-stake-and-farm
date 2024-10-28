import MainLayout from '@/components/layout/MainLayout';
import { ToastContainer } from '@/components/ui/Toast';
import '@/styles/globals.scss';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import '../../public/font/stylesheet.css';

export const metadata: Metadata = {
  title: 'Baryon Network | Redefine your Trading experience',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
