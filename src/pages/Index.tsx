
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { VoiceSection } from "@/components/VoiceSection";
import { TextInput } from "@/components/TextInput";
import { VoiceControls } from "@/components/VoiceControls";
import { UserProfiles } from "@/components/UserProfiles";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Shield, Globe, ArrowRight } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [inputText, setInputText] = useState("Dans l'ancienne terre d'Eldoria, où les cieux scintillaient et les forêts murmuraient des secrets au vent, vivait un dragon nommé Zephyros. Pas du genre à tout brûler... mais il était doux, sage, avec des yeux comme de vieilles étoiles. Même les oiseaux se taisaient quand il passait.");
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 1.0,
    tone: "neutral"
  });

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header 
        user={user} 
        onAuthClick={() => {}} 
        onLogout={handleLogout} 
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            SPEECHIFY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            The Future of Voice AI Technology
          </p>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Transform text into lifelike speech with cutting-edge AI models. 
            Supporting millions of developers, creators, and businesses worldwide with 
            conversational AI and premium voice generation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full backdrop-blur-sm"
            >
              Contact Sales
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-gray-300">
                  Generate high-quality audio in seconds with our optimized AI models
                </p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Language</h3>
                <p className="text-gray-300">
                  Support for multiple languages and accents with natural pronunciation
                </p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
                <p className="text-gray-300">
                  Your data is protected with enterprise-grade security and privacy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Voice Features */}
        <VoiceSection />

        {/* Main Interface */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-blue-400" />
              AI Voice Generator
            </h2>
            <p className="text-gray-300">
              Enter your text and select voice settings to generate natural-sounding speech
            </p>
          </div>
          
          <TextInput 
            value={inputText} 
            onChange={setInputText} 
            selectedLanguage={selectedLanguage} 
            onLanguageChange={setSelectedLanguage} 
          />
          
          <VoiceControls 
            selectedVoice={selectedVoice} 
            onVoiceChange={setSelectedVoice} 
            voiceSettings={voiceSettings} 
            onSettingsChange={setVoiceSettings} 
            inputText={inputText} 
          />
        </div>

        {/* User Profiles */}
        <UserProfiles />
      </main>
    </div>
  );
};

export default Index;
