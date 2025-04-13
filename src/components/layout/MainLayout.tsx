
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isMobile ? 'pl-0' : 'pl-0 md:pl-64'}`}>
        <Header title={title} />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
