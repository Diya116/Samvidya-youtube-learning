import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { User, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
function Setting() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      {/* Appearance Section */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Theme
            </span>
            <Button
              aria-label="change-theme"
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center gap-2"
            >
              {theme === "light" ? (
                <div className="cursor-pointer flex gap-2 items-center">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </div>
              ) : (
                <div className="cursor-pointer flex gap-2 items-center">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="text-white w-full flex items-center justify-center gap-2  cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to log out?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className="cursor-pointer">
                  Yes, log out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default Setting;
