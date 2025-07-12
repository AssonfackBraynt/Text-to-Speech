
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Download, Trash2, Music } from "lucide-react";

interface AudioItem {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  text: string;
  voice: string;
}

const Downloads = () => {
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    // Load saved audio items from localStorage
    const savedItems = localStorage.getItem('voiceAI_downloads');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      // Convert createdAt strings back to Date objects
      const itemsWithDates = parsedItems.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
      setAudioItems(itemsWithDates);
    }
  }, []);

  const handlePlay = (id: string, url: string) => {
    if (playingId === id) {
      // Stop current audio
      setPlayingId(null);
      // In a real implementation, you'd pause the audio here
    } else {
      setPlayingId(id);
      // In a real implementation, you'd play the audio here
      const audio = new Audio(url);
      audio.onended = () => setPlayingId(null);
      audio.play();
    }
  };

  const handleDelete = (id: string) => {
    const updatedItems = audioItems.filter(item => item.id !== id);
    setAudioItems(updatedItems);
    localStorage.setItem('voiceAI_downloads', JSON.stringify(updatedItems));
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header user={null} onAuthClick={() => {}} onLogout={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Music className="w-8 h-8 text-blue-400" />
            Downloaded Audio Files
          </h1>
          <p className="text-gray-300">
            Manage and play your generated voice audio files
          </p>
        </div>

        {audioItems.length === 0 ? (
          <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
            <CardContent className="py-12 text-center">
              <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No audio files yet</h3>
              <p className="text-gray-400">
                Generate and download some audio files to see them here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {audioItems.map((item) => (
              <Card key={item.id} className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="truncate">{item.name}</span>
                    <span className="text-sm text-gray-400 font-normal">
                      {item.createdAt.toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-gray-300 text-sm">
                    <p><strong>Voice:</strong> {item.voice}</p>
                    <p className="mt-2 line-clamp-3">{item.text}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handlePlay(item.id, item.url)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      {playingId === item.id ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {playingId === item.id ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      onClick={() => handleDownload(item.url, item.name)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Downloads;
