
import { User, LogOut, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Header = ({ user, onAuthClick, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    console.log("Auth button clicked");
    navigate("/auth");
  };

  const handleLogoClick = () => {
    console.log("Logo clicked - navigating to home");
    navigate("/");
  };

  const handleDownloadsClick = () => {
    console.log("Downloads clicked");
    navigate("/downloads");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    onLogout();
  };

  return (
    <header className="border-b border-white/20 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SPEECHIFY
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={handleLogoClick}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={handleDownloadsClick}
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Downloads
          </button>
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">
                Hello, {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleAuthClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
