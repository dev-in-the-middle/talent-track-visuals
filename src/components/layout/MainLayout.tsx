
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/hooks/use-sidebar';
import { ThemeProvider } from '@/providers/theme-provider';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const { isCollapsed, toggleSidebar } = useSidebar();
  
  return (
    <ThemeProvider>
      <div className="flex h-screen dark:bg-gray-900 overflow-hidden">
        <div className="fixed left-0 top-0 h-full z-20">
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-[80px]' : 'ml-[240px]'}`}>
          <div className="fixed top-0 right-0 z-20 bg-white" style={{ width: `calc(100% - ${isCollapsed ? '80px' : '240px'})` }}>
            <Header 
              title={title} 
              onToggleSidebar={toggleSidebar}
              isSidebarCollapsed={isCollapsed}
            />
          </div>
          <main className="flex-1 overflow-auto bg-gray-50 p-4 mt-[73px]">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
