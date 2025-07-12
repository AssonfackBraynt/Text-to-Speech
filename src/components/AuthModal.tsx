
import { useState } from "react";
import { X, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    if (isLogin) {
      onLogin({ 
        name: formData.email.split('@')[0], 
        email: formData.email,
        preferences: {
          favoriteVoice: "alloy",
          defaultLanguage: "fr"
        }
      });
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur VoiceAI !",
      });
    } else {
      onLogin({ 
        name: formData.name, 
        email: formData.email,
        preferences: {
          favoriteVoice: "alloy",
          defaultLanguage: "fr"
        }
      });
      toast({
        title: "Compte créé",
        description: "Votre compte a été créé avec succès !",
      });
    }
    
    onClose();
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {isLogin ? "Se connecter" : "Créer un compte"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10"
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {isLogin ? "Se connecter" : "Créer le compte"}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isLogin 
              ? "Pas encore de compte ? Créer un compte" 
              : "Déjà un compte ? Se connecter"
            }
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
