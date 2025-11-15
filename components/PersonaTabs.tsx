"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code, Wrench, PenTool, Headphones, BookOpen, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";

const personas = [
  {
    id: "students",
    title: "For Students",
    icon: GraduationCap,
    description: "Capture class notes and draft essays hands-free. Perfect for lectures and study sessions.",
  },
  {
    id: "developers",
    title: "For Developers",
    icon: Code,
    description: "Speak context and get better results. Dictate code comments and documentation naturally.",
  },
  {
    id: "engineers",
    title: "For Engineers",
    icon: Wrench,
    description: "Dictate in natural language and let AI translate – perfect for technical documentation and reports.",
  },
  {
    id: "creators",
    title: "For Creators",
    icon: PenTool,
    description: "Brainstorm ideas and reply to messages with voice. Turn thoughts into polished content instantly.",
  },
  {
    id: "support",
    title: "For Customer Support",
    icon: Headphones,
    description: "Respond to tickets faster with voice. Maintain professionalism while working at 4x speed.",
  },
  {
    id: "writers",
    title: "For Writers",
    icon: BookOpen,
    description: "Overcome writer's block by speaking your thoughts. Get polished text ready for editing.",
  },
  {
    id: "accessibility",
    title: "For Accessibility",
    icon: Accessibility,
    description: "Make technology more accessible. Voice input for those who prefer or need speech over typing.",
  },
];

export function PersonaTabs() {
  const [activePersona, setActivePersona] = useState(personas[0].id);

  const activePersonaData = personas.find((p) => p.id === activePersona) || personas[0];
  const Icon = activePersonaData.icon;

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {personas.map((persona) => {
          const PersonaIcon = persona.icon;
          return (
            <button
              key={persona.id}
              onClick={() => setActivePersona(persona.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                "border-2 flex items-center gap-2 hover:scale-105",
                activePersona === persona.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg"
                  : "bg-white/70 backdrop-blur-sm text-foreground border-foreground/10 hover:border-foreground/30 hover:bg-white/90"
              )}
            >
              <PersonaIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{persona.title}</span>
              <span className="sm:hidden">{persona.title.replace("For ", "")}</span>
            </button>
          );
        })}
      </div>

      {/* Active Persona Card */}
      <Card className="border-2 border-foreground/10 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" key={activePersona}>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
              <Icon className="h-8 w-8" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl font-bold mb-2 text-foreground">{activePersonaData.title}</h3>
              <p className="text-lg text-muted-foreground">{activePersonaData.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

