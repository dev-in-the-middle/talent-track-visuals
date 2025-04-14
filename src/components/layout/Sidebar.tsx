
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  PieChart,
  Settings,
  LogOut,
  Menu,
  LayoutKanban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 font-normal",
        active ? "bg-purple-100 text-purple-800" : "hover:bg-purple-50 text-gray-600"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/candidates", icon: <Users size={20} />, label: "Candidates" },
    { to: "/kanban", icon: <LayoutKanban size={20} />, label: "Kanban Board" },
    { to: "/resumes", icon: <FileText size={20} />, label: "Resumes & CVs" },
    { to: "/reports", icon: <PieChart size={20} />, label: "Reports" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50"
        >
          <Menu size={24} />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 p-4 flex flex-col h-screen transition-all duration-300",
          isMobile ? 
            (isOpen ? "fixed left-0 top-0 w-64 z-40" : "fixed -left-64 top-0 w-64 z-40") :
            "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center mb-8 px-2 py-4">
          <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="ml-2 text-xl font-bold text-navy">TalentTrack</span>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1 flex-1">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={location.pathname === link.to}
            />
          ))}
        </nav>

        {/* Bottom section */}
        <div className="pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
