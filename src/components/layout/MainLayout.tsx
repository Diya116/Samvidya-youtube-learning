import { Outlet } from "react-router-dom"
import NavbarNew from "@/components/layout/Sidebar" // Updated import

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Navigation Component */}
      <NavbarNew />
      
      {/* Main Content Area */}
      <main className="
        flex-1
        w-full
        min-h-screen
        overflow-y-auto
        
        /* Desktop: Account for sidebar */
        lg:ml-64
        
        /* Mobile: Account for bottom nav */
        pb-20 lg:pb-0
        
        /* Padding */
        p-4 sm:p-6 lg:p-8
      ">
        <div className="max-w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout