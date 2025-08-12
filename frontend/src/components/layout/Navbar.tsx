import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthContext';

import { User, Moon, Sun,LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardHeader: React.FC = () => {

const navigator = useNavigate();
const {theme,toggleTheme}=useTheme();
const {  logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 display flex justify-center">
      <div className="  container flex h-16 items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-secondary">Samvidya</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {(theme==="light") ? (
              <Sun className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="cursor-pointer relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigator("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => confirm("Are you sure you want to log out?") && logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
