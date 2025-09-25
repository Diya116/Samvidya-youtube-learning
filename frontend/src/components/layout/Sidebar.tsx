import {   GraduationCap, Settings, NotebookPen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function NavbarNew() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if path is active
  const isActivePath = (path:string) => {
    return location.pathname === path;
  };

  // Navigation items array for easier management
  const navigationItems = [
    // { path: "/workspace", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/workspace/courses", icon: GraduationCap, label: "Courses" },
    { path: "/workspace/notes", icon: NotebookPen, label: "Notes" },
    // { path: "/workspace/profile", icon: User, label: "Profile" },
    { path: "/workspace/setting", icon: Settings, label: "Settings" }
  ];

  const handleNavigation = (path:string) => {
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen flex-col items-start gap-2 w-64 pt-4 pl-10 pr-4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center w-full mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-secondary">Samvidya</span>
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="mt-7 flex flex-col gap-6 w-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <div
                key={item.path}
                className={`
                  flex gap-3 cursor-pointer items-center
                  px-3 py-2 rounded-lg transition-all duration-200
                  text-base
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary'
                  }
                `}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Header - Only visible on mobile */}
      {/* <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-secondary">Samvidya</span>
          </h1>
        </div>
      </div> */}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 py-2 safe-area-inset-bottom">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <button
                key={item.path}
                className={`
                  flex flex-col items-center justify-center
                  px-2 py-1 rounded-lg transition-all duration-200
                  min-w-0 flex-1
                  ${isActive 
                    ? 'text-primary' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                  }
                `}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon 
                  size={20} 
                  className={`mb-1 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} 
                />
                <span className={`text-xs truncate w-full text-center ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer for mobile content to avoid overlap with bottom nav */}
      <div className="lg:hidden h-16" />
    </>
  );
}

export default NavbarNew;