import { Metadata } from 'next';
import React from 'react';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';


import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>

  );
};

export default Layout;
