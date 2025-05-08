
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
  Kanban,
  BriefcaseBusiness
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isCollapsed?: boolean;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isCollapsed?: boolean;
}

const SidebarLink = ({ to, icon, label, active, isCollapsed }: SidebarLinkProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full font-normal",
        isCollapsed ? "justify-center" : "justify-start gap-3",
        active ? "bg-purple-100 text-purple-800" : "hover:bg-purple-50 text-gray-600"
      )}
      title={isCollapsed ? label : undefined}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Button>
  </Link>
);

const Sidebar = ({ isCollapsed = false }: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/candidates", icon: <Users size={20} />, label: "Candidates" },
    { to: "/kanban", icon: <Kanban size={20} />, label: "Kanban Board" },
    { to: "/jobs", icon: <BriefcaseBusiness size={20} />, label: "Job Listings" },
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
          "bg-white border-r border-gray-200 p-2 flex flex-col h-screen transition-all duration-300",
          isMobile ? 
            (isOpen ? "fixed left-0 top-0 w-56 z-40" : "fixed -left-56 top-0 w-56 z-40") :
            isCollapsed ? "w-16" : "w-56"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center mb-4 px-2 py-2", isCollapsed ? "justify-center" : "")}>
          <div className="h-7 w-7 bg-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-base">T</span>
          </div>
          {!isCollapsed && <span className="ml-2 text-xl font-bold text-navy">TalentTrack</span>}
        </div>

        {/* Navigation links */}
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={location.pathname === link.to}
              isCollapsed={isCollapsed}
            />
          ))}
          <Button
            variant="ghost"
            className={cn(
              "w-full font-normal mt-4",
              isCollapsed ? "justify-center" : "justify-start gap-3",
              "text-gray-600 hover:bg-purple-50"
            )}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </nav>
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
