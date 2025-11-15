"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonaTabs } from "@/components/PersonaTabs";
import { Navbar } from "@/components/ui/mini-navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AIVisualizer } from "@/components/AIVisualizer";
import Link from "next/link";
import { 
  ArrowRight, 
  X, 
  Repeat, 
  Sparkles, 
  Globe, 
  BookOpen,
  Play,
  Mic,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Powered by OpenAI Whisper</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Don't type,
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  just speak
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The voice-to-text AI that turns speech into clear, polished writing in every app. 
                <span className="block mt-2 text-lg">Speak naturally and get perfectly formatted text instantly.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-7 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Try Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-7 h-auto border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 backdrop-blur-sm transition-all duration-200"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>95%+ accuracy</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visualizer */}
            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <AIVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { value: "4x", label: "Faster than typing", icon: Zap, color: "from-blue-500 to-cyan-500" },
              { value: "100+", label: "Languages supported", icon: Globe, color: "from-purple-500 to-pink-500" },
              { value: "95%+", label: "Accuracy rate", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.label}
                  className="border-2 border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/50 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-lg">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-foreground">AI-Powered Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Everything you need
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make voice-to-text seamless and accurate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: X, title: "Removes Filler", desc: "Automatically removes 'um', 'uh', and other filler words from your speech for cleaner text.", gradient: "from-red-500 to-orange-500" },
              { icon: Repeat, title: "Removes Repetition", desc: "Eliminates repeated words and phrases, keeping your text concise and professional.", gradient: "from-blue-500 to-cyan-500" },
              { icon: Sparkles, title: "AI Auto Edits", desc: "Smart corrections and formatting applied automatically. Get polished text without manual editing.", gradient: "from-purple-500 to-pink-500" },
              { icon: Globe, title: "100+ Languages", desc: "Supports over 100 languages with automatic language detection. Speak in your native tongue.", gradient: "from-green-500 to-emerald-500" },
              { icon: BookOpen, title: "Personal Vocabulary", desc: "Add custom words and phrases to your personal dictionary for specialized terminology.", gradient: "from-indigo-500 to-purple-500" },
              { icon: Shield, title: "Privacy First", desc: "Your data is encrypted and secure. We never share your transcriptions with third parties.", gradient: "from-cyan-500 to-blue-500" },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="group border-2 border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/70 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases / Personas Section */}
      <section id="use-cases" className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-foreground">For Everyone</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Flow for everyone
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how different professionals use AI Voice Keyboard to work faster
            </p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm border-2 border-foreground/10 rounded-3xl p-8 lg:p-12 shadow-xl">
            <PersonaTabs />
          </div>
        </div>
      </section>

      {/* Testimonials / Logos Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by professionals everywhere
            </h2>
            <p className="text-muted-foreground text-lg">
              Used by teams at leading companies worldwide
            </p>
          </div>
          
          {/* Logo Strip */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16">
            {["OpenAI", "Vercel", "Meta", "Microsoft", "Google", "Apple"].map((company, index) => (
              <div 
                key={company} 
                className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent opacity-60 hover:opacity-100 transition-opacity duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "This has completely transformed how I write. I'm 4x faster and the quality is better than when I type.", author: "Sarah Chen", role: "Software Engineer" },
              { quote: "The custom dictionary feature is a game-changer for technical terms. It understands my jargon perfectly.", author: "Dr. James Wilson", role: "Medical Researcher" },
              { quote: "As a writer, this tool helps me overcome writer's block. I just speak my thoughts and get polished text.", author: "Emma Rodriguez", role: "Content Creator" },
            ].map((testimonial, index) => (
              <Card 
                key={index}
                className="border-2 border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl bg-white/70 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="p-12 lg:p-16 text-center relative z-10">
              <Sparkles className="h-12 w-12 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Ready to transform your workflow?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of professionals who are already using AI Voice Keyboard to work faster and smarter
              </p>
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-7 h-auto shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-foreground/10 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">AI Voice Keyboard</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transform your voice into text with AI-powered transcription.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 AI Voice Keyboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
