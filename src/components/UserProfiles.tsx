
import { User, Clock, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const profiles = [
  {
    name: "Clément",
    action: "Narrare a story",
    avatar: "👤",
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "2 haut-parleurs",
    action: "Créer un dialogue",
    avatar: "👥",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Cindy",
    action: "Commentaire d'un match",
    avatar: "👤",
    color: "bg-pink-100 text-pink-700"
  },
  {
    name: "Clément",
    action: "Jouer un sergent instructeur",
    avatar: "👤",
    color: "bg-gray-100 text-gray-700"
  },
  {
    name: "Maxime",
    action: "Raconter une vieille histoire",
    avatar: "👤",
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Caroline",
    action: "Fournir un support client",
    avatar: "👤",
    color: "bg-orange-100 text-orange-700"
  }
];

export const UserProfiles = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Profils utilisateurs populaires
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile, index) => (
          <Card 
            key={index}
            className="p-4 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${profile.color}`}>
                <span className="text-lg">{profile.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-600">{profile.action}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-6 bg-black text-white px-8 py-4 rounded-full">
          <span className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>CHAT VOCAL</span>
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">🇫🇷</span>
            <span className="text-sm">FRENCH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
