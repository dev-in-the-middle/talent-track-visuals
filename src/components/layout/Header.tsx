
import { useState } from 'react';
import { Bell, Search, User, PanelLeftClose, PanelLeft } from 'lucide-react';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

const Header = ({ title, onToggleSidebar, isSidebarCollapsed }: HeaderProps) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New candidate applied for Frontend Developer" },
    { id: 2, message: "Interview scheduled with John Doe" },
    { id: 3, message: "Resume review pending for 5 candidates" },
  ]);
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </Button>

        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex-1" />

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-60"
          />
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="py-2 cursor-pointer">
                <span className="text-sm">{notification.message}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">JD</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
