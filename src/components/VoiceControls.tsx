import { useState, useEffect } from "react";
import { Play, Square, Download, Volume2, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface VoiceControlsProps {
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
  voiceSettings: {
    speed: number;
    pitch: number;
    tone: string;
  };
  onSettingsChange: (settings: any) => void;
  inputText: string;
}

export const VoiceControls = ({
  selectedVoice,
  onVoiceChange,
  voiceSettings,
  onSettingsChange,
  inputText
}: VoiceControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceCategory, setVoiceCategory] = useState("standard");
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      console.log("Available voices:", voices.length);
      setAvailableVoices(voices);
    };

    // Load voices immediately
    loadVoices();
    
    // Also listen for voices changed event
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Celebrity voice options (these would be voice IDs from ElevenLabs or similar service)
  const celebrityVoices = [
    { name: "celebrity_morgan_freeman", label: "Morgan Freeman", description: "Deep, authoritative narrator voice" },
    { name: "celebrity_scarlett_johansson", label: "Scarlett Johansson", description: "Warm, conversational tone" },
    { name: "celebrity_david_attenborough", label: "David Attenborough", description: "Nature documentary style" },
    { name: "celebrity_stephen_hawking", label: "Stephen Hawking", description: "Scientific, robotic tone" },
    { name: "celebrity_barack_obama", label: "Barack Obama", description: "Presidential, inspiring voice" },
    { name: "celebrity_oprah_winfrey", label: "Oprah Winfrey", description: "Enthusiastic, empowering tone" }
  ];

  const standardVoices = [
    { name: "alloy", label: "Alloy" },
    { name: "echo", label: "Echo" },
    { name: "fable", label: "Fable" },
    { name: "onyx", label: "Onyx" },
    { name: "nova", label: "Nova" },
    { name: "shimmer", label: "Shimmer" }
  ];

  const handleGenerate = () => {
    console.log("Generating audio for text:", inputText);
    console.log("Selected voice:", selectedVoice);
    console.log("Voice category:", voiceCategory);
    
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to generate audio",
        variant: "destructive",
      });
      return;
    }

    // Check for celebrity voices (would require API integration)
    if (voiceCategory === "celebrity" && selectedVoice.startsWith("celebrity_")) {
      toast({
        title: "Celebrity Voices Coming Soon!",
        description: "Celebrity voice cloning requires additional API integration. Using browser voice for now.",
      });
      // Fall back to browser speech synthesis for now
    }

    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Error",
        description: "Speech synthesis is not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    try {
      // Stop any current speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(inputText);
      
      // Find the selected voice (for browser voices)
      if (voiceCategory === "browser" || voiceCategory === "celebrity") {
        const voice = availableVoices.find(v => v.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
          console.log("Using voice:", voice.name);
        } else {
          console.log("Voice not found, using default");
        }
      }

      utterance.rate = voiceSettings.speed;
      utterance.pitch = voiceSettings.pitch;

      utterance.onstart = () => {
        console.log("Speech started");
        setIsPlaying(true);
        toast({
          title: "Audio Playing",
          description: "Your text is being spoken",
        });
      };

      utterance.onend = () => {
        console.log("Speech ended");
        setIsPlaying(false);
        setCurrentUtterance(null);
      };

      utterance.onerror = (event) => {
        console.error("Speech error:", event);
        setIsPlaying(false);
        setCurrentUtterance(null);
        toast({
          title: "Error",
          description: "Failed to generate audio. Please try again.",
          variant: "destructive",
        });
      };

      setCurrentUtterance(utterance);
      speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Error",
        description: "Failed to generate audio. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStop = () => {
    console.log("Stopping audio");
    speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentUtterance(null);
  };

  const handleDownload = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text before saving",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a simulated audio item for the downloads page
      const audioId = `audio_${Date.now()}`;
      const audioItem = {
        id: audioId,
        name: `Generated_Audio_${audioId}.mp3`,
        url: `data:audio/mp3;base64,fake_audio_data`, // In real implementation, this would be actual audio data
        createdAt: new Date(),
        text: inputText,
        voice: selectedVoice
      };

      // Save to localStorage
      const existingItems = JSON.parse(localStorage.getItem('voiceAI_downloads') || '[]');
      existingItems.push(audioItem);
      localStorage.setItem('voiceAI_downloads', JSON.stringify(existingItems));

      console.log("Audio saved to downloads");
      toast({
        title: "Success",
        description: "Audio saved to downloads",
      });
    } catch (error) {
      console.error("Error saving audio:", error);
      toast({
        title: "Error",
        description: "Failed to save audio",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Category Selection */}
      <Card className="backdrop-blur-sm bg-white/5 border-white/20">
        <CardHeader>
          <CardTitle className="text-sm text-white">Voice Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={voiceCategory} 
            onValueChange={setVoiceCategory}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <label htmlFor="standard" className="text-white cursor-pointer">Standard AI Voices</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="celebrity" id="celebrity" />
              <label htmlFor="celebrity" className="text-white cursor-pointer flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                Celebrity Voices
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="browser" id="browser" />
              <label htmlFor="browser" className="text-white cursor-pointer">Browser Voices</label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Voice Selection based on category */}
      {voiceCategory === "standard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {standardVoices.map((voice) => (
            <Card 
              key={voice.name}
              className={`cursor-pointer transition-all hover:shadow-md backdrop-blur-sm ${
                selectedVoice === voice.name 
                  ? 'ring-2 ring-blue-400 bg-blue-500/20 border-blue-400/50' 
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
              onClick={() => onVoiceChange(voice.name)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-white">
                  <Volume2 className="w-4 h-4" />
                  {voice.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 px-2 py-1 rounded text-blue-300">
                    Neural
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {voiceCategory === "celebrity" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {celebrityVoices.map((voice) => (
            <Card 
              key={voice.name}
              className={`cursor-pointer transition-all hover:shadow-md backdrop-blur-sm ${
                selectedVoice === voice.name 
                  ? 'ring-2 ring-yellow-400 bg-yellow-500/20 border-yellow-400/50' 
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
              onClick={() => onVoiceChange(voice.name)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-white">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {voice.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400 mb-2">{voice.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-400/30 px-2 py-1 rounded text-yellow-300">
                    Premium
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Browser Voices */}
      {voiceCategory === "browser" && availableVoices.length > 0 && (
        <Card className="backdrop-blur-sm bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-sm text-white">Browser Voices ({availableVoices.length} available)</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedVoice} onValueChange={onVoiceChange}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name} className="text-white">
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Voice Settings */}
      <Card className="backdrop-blur-sm bg-white/5 border-white/20">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2 text-white">
            <Settings className="w-4 h-4" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-white">Speed: {voiceSettings.speed}</label>
            <Slider
              value={[voiceSettings.speed]}
              onValueChange={(value) => onSettingsChange({ ...voiceSettings, speed: value[0] })}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block text-white">Pitch: {voiceSettings.pitch}</label>
            <Slider
              value={[voiceSettings.pitch]}
              onValueChange={(value) => onSettingsChange({ ...voiceSettings, pitch: value[0] })}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex gap-4">
        {!isPlaying ? (
          <Button 
            onClick={handleGenerate} 
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
          >
            <Play className="w-4 h-4 mr-2" />
            Generate and Play
          </Button>
        ) : (
          <Button onClick={handleStop} variant="destructive" className="flex-1">
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
        )}
        
        <Button 
          onClick={handleDownload} 
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
};
