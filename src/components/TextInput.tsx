
import { useState } from "react";
import { ChevronDown, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

export const TextInput = ({ value, onChange, selectedLanguage, onLanguageChange }: TextInputProps) => {
  const [showLanguages, setShowLanguages] = useState(false);
  
  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Texte à convertir</h2>
        
        <div className="relative">
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="text-lg">{selectedLang.flag}</span>
            <span className="text-sm font-medium">{selectedLang.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showLanguages && (
            <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setShowLanguages(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                >
                  <span>{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez votre texte ici..."
        className="min-h-[200px] text-base leading-relaxed resize-none border-2 border-gray-200 focus:border-blue-500 rounded-xl"
      />
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{value.length} caractères</span>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4" />
          <span>Aperçu vocal disponible</span>
        </div>
      </div>
    </div>
  );
};
