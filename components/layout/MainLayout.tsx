import BaryonServicesProvider from '@/providers/BaryonServicesProvider';
import GlobalStateProvider from '@/providers/GlobalStateProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import WalletProvider from '@/providers/WalletProvider';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ReactQueryProvider>
        <WalletProvider>
          <BaryonServicesProvider>
            <GlobalStateProvider />
            <Header />
            <main className="ipad:pb-24 pt-[4.75rem] ipad:pt-[3.75rem] min-h-dvh relative z-10">
              <div className="pt-6">{children}</div>
            </main>
            <Footer />
          </BaryonServicesProvider>
        </WalletProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
