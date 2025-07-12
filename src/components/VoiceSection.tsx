
import { Mic, FileText, MessageCircle, Copy, Volume2, BookOpen } from "lucide-react";

const features = [
  { icon: Mic, title: "SYNTHÈSE VOCALE", active: true },
  { icon: FileText, title: "TRANSCRIPTION" },
  { icon: MessageCircle, title: "CONVERSATIONAL AI" },
  { icon: Copy, title: "DOUBLAGE" },
  { icon: Volume2, title: "VOICE CLONING" },
  { icon: BookOpen, title: "ELEVENREADER" }
];

export const VoiceSection = () => {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {features.map((feature, index) => (
          <button
            key={index}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
              feature.active 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <feature.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{feature.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
