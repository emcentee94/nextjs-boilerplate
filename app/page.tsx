import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Users,
  Shield,
  Clock,
  Heart,
  MessageCircle,
  Calculator,
  Flag as Flask,
  Globe,
  Sparkles,
  Zap,
  Target,
} from "lucide-react"
import Image from "next/image"

export default function TaughtfulLanding() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#888625]/10 to-[#FD6585]/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-[#FF9A2E]/10 to-[#888625]/10 rounded-full blur-2xl animate-float delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-full blur-xl animate-float delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 hover:bg-background/98 hover:shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 relative transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]">
              <Image
                src="/images/taughtful-logo.png"
                alt="Taughtful"
                width={40}
                height={40}
                className="rounded-full shadow-lg group-hover:shadow-xl"
              />
            </div>
            <span className="text-xl font-bold text-foreground font-mono transition-all duration-500 group-hover:text-[#FD6585] group-hover:scale-110">
              Taughtful
            </span>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex bg-gradient-to-r from-transparent to-[#FD6585]/5 hover:from-[#FD6585]/10 hover:to-[#FF9A2E]/10 hover:border-[#FD6585]/50 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:-translate-y-1 border-2 rounded-full font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Get Started
          </Button>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="py-32 px-4 bg-gradient-to-br from-white via-[#FDE5DA]/20 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-8 left-1/4 w-12 h-12 bg-[#FD6585]/30 rounded-full animate-bounce delay-0 hover:scale-200 transition-all duration-500 cursor-pointer shadow-lg"></div>
          <div className="absolute top-16 right-1/3 w-8 h-8 bg-[#888625]/40 rounded-full animate-bounce delay-300 hover:scale-200 transition-all duration-500 cursor-pointer shadow-lg"></div>
          <div className="absolute bottom-8 left-1/3 w-16 h-16 bg-[#FF9A2E]/20 rounded-full animate-bounce delay-700 hover:scale-150 transition-all duration-500 cursor-pointer shadow-xl"></div>
          <div className="absolute bottom-16 right-1/4 w-10 h-10 bg-[#FD6585]/35 rounded-full animate-bounce delay-1000 hover:scale-200 transition-all duration-500 cursor-pointer shadow-lg"></div>
          <BookOpen className="absolute top-12 left-1/6 w-8 h-8 text-[#FD6585]/40 animate-float hover:text-[#FD6585] hover:scale-150 transition-all duration-500 cursor-pointer drop-shadow-lg" />
          <Brain className="absolute bottom-12 right-1/6 w-10 h-10 text-[#888625]/40 animate-float delay-500 hover:text-[#888625] hover:scale-150 transition-all duration-500 cursor-pointer drop-shadow-lg" />
          <Zap className="absolute top-1/2 left-10 w-6 h-6 text-[#FF9A2E]/40 animate-pulse hover:text-[#FF9A2E] hover:scale-150 transition-all duration-500 cursor-pointer" />
          <Target
            className="absolute top-1/3 right-10 w-7 h-7 text-[#FD6585]/40 animate-spin hover:text-[#FD6585] hover:scale-150 transition-all duration-500 cursor-pointer"
            style={{ animationDuration: "8s" }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-10 animate-fade-in mb-20">
            <h1 className="text-6xl md:text-8xl font-black text-balance leading-tight font-mono hover:scale-105 transition-all duration-700 cursor-default">
              <span className="text-foreground hover:text-[#888625] transition-colors duration-500">
                Other AI tools?
              </span>{" "}
              <span className="text-[#FD6585] relative inline-block group cursor-pointer">
                Absolute detention.
                <div className="absolute -bottom-4 left-0 right-0 h-6 bg-gradient-to-r from-[#FD6585]/40 via-[#FF9A2E]/40 to-[#FD6585]/40 rounded-full -rotate-1 animate-pulse group-hover:bg-gradient-to-r group-hover:from-[#FD6585]/70 group-hover:via-[#FF9A2E]/70 group-hover:to-[#FD6585]/70 group-hover:scale-110 group-hover:rotate-1 transition-all duration-500"></div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#FF9A2E] animate-pulse group-hover:animate-spin group-hover:scale-125 transition-all duration-500" />
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-relaxed font-sans hover:text-foreground transition-all duration-500 hover:scale-105 cursor-default max-w-5xl mx-auto">
              Generic AI doesn't get Australian classrooms. Taughtful does — curriculum v9 aligned, trauma-informed
              scaffolding, Indigenous perspectives embedded.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="text-center animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center">
                <Link href="/coming-soon">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group rounded-2xl border-2 border-white/20 hover:border-white/40"
                  >
                    <Zap className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                    Join Beta – Free Access
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 py-6 text-xl font-bold bg-gradient-to-r from-transparent to-[#FD6585]/5 border-3 border-foreground hover:bg-gradient-to-r hover:from-[#FD6585]/10 hover:to-[#FF9A2E]/10 hover:border-[#FD6585] hover:scale-110 hover:-translate-y-2 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-xl group"
                >
                  <BookOpen className="mr-3 w-6 h-6 group-hover:animate-pulse" />
                  See a Sample Lesson Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER STRIP */}
      <section className="py-24 px-4 bg-gradient-to-r from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] text-foreground text-center relative overflow-hidden border-y border-[#FD6585]/10">
        <div className="absolute inset-0">
          <Clock
            className="absolute top-6 left-1/4 w-10 h-10 text-[#FD6585]/30 animate-spin hover:text-[#FD6585]/60 hover:scale-125 transition-all duration-500 cursor-pointer"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute top-8 right-1/4 w-8 h-8 bg-[#FD6585]/20 rounded-full animate-pulse hover:bg-[#FD6585]/40 hover:scale-150 transition-all duration-500 cursor-pointer"></div>
          <Sparkles className="absolute bottom-6 left-1/3 w-8 h-8 text-[#FF9A2E]/30 animate-pulse hover:text-[#FF9A2E]/60 hover:scale-125 transition-all duration-500 cursor-pointer" />
        </div>
        <div className="container mx-auto max-w-5xl relative space-y-8">
          <h2 className="text-4xl md:text-6xl font-black font-mono hover:scale-105 transition-all duration-500 cursor-default text-black">
            Teaching in Australia right now?{" "}
            <span className="animate-fade-in delay-1000 inline-block hover:animate-bounce">It's a lot.</span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold font-sans hover:scale-105 transition-all duration-500 cursor-default text-foreground">
            The hours. The admin. The endless "do more with less."
          </p>
          <p className="text-xl md:text-2xl font-medium font-sans hover:scale-105 transition-all duration-500 cursor-default text-muted-foreground">
            No wonder burnout is at an all-time high.
          </p>
        </div>
      </section>

      {/* 3. WHAT MAKES TAUGHTFUL DIFFERENT */}
      <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-r from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA]">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-foreground font-mono hover:scale-105 transition-all duration-700 cursor-default mb-6">
              What Makes Taughtful Different
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="w-16 h-16" />,
                title: "Culturally safe by default",
                description:
                  "No AI-generated Indigenous perspectives. Only vetted sources. Teachers choose, AI never imposes.",
                color: "bg-[#FD6585]",
              },
              {
                icon: <Heart className="w-16 h-16" />,
                title: "Trauma-informed built-in",
                description:
                  "Co-regulation routines, predictability chips, and low-stakes entry tasks — surfaced automatically.",
                color: "bg-[#FF9A2E]",
              },
              {
                icon: <BookOpen className="w-16 h-16" />,
                title: "Teacher authored, always",
                description:
                  "No prompts turning into unvetted paragraphs. Everything is structured, teacher-led, and exportable with clarity.",
                color: "bg-[#888625]",
              },
            ].map((pillar, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-56 h-56 ${pillar.color} rounded-full flex flex-col items-center justify-center mb-10 group-hover:scale-125 transition-all duration-700 hover:animate-bounce mx-auto shadow-2xl hover:shadow-3xl relative overflow-hidden cursor-pointer border-4 border-white/20 hover:border-white/40`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-500"></div>
                  <div className="text-white group-hover:scale-150 transition-all duration-500 mb-4 relative z-10 drop-shadow-lg">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono text-center px-6 leading-tight relative z-10 group-hover:scale-110 transition-all duration-500">
                    {pillar.title}
                  </h3>
                  <Sparkles className="absolute top-4 right-4 w-6 h-6 text-white/40 animate-pulse group-hover:animate-spin group-hover:text-white/80 transition-all duration-500" />
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed font-sans group-hover:text-foreground transition-all duration-500 max-w-sm mx-auto text-lg hover:scale-105 cursor-default">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE FINE PRINT */}
      <section className="py-24 px-4 bg-[#FDE5DA] relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground font-mono hover:scale-105 transition-transform duration-500">
            The Fine Print
          </h2>
          <span className="block text-2xl md:text-3xl mb-16 text-muted-foreground">(No Nasty Surprises)</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              {["Free access during beta", "10 lessons per month", "Direct line to developers (actual humans)"].map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 group bg-white/50 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300"
                  >
                    <div className="text-4xl">✅</div>
                    <span className="text-lg font-semibold font-mono group-hover:text-primary transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="space-y-6">
              {["Features will evolve as we listen", "Beta ends at launch (special pricing for early legends)"].map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 group bg-white/50 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300"
                  >
                    <div className="text-4xl">⚠️</div>
                    <span className="text-lg font-semibold font-mono group-hover:text-primary transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DON'T JUST TAKE OUR WORD */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-foreground font-mono hover:scale-105 transition-transform duration-500 text-center md:text-7xl">
              Don't Just Take Our Word
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-center">
              <blockquote className="text-2xl md:text-3xl font-medium italic mb-8 font-sans">
                "Finally, someone who gets what we actually need in classrooms."
              </blockquote>
              <p className="text-xl font-bold font-mono">— Sarah, Year 8 English</p>
            </div>
            <div className="space-y-8">
              <div className="bg-[#FD6585] text-white rounded-full px-8 py-4 text-center font-bold text-lg hover:scale-105 transition-transform duration-300">
                30+ teachers already testing
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold mb-6 font-mono">All F-10 subjects covered:</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <Calculator className="w-5 h-5" />
                    <span className="font-medium">Mathematics</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <Flask className="w-5 h-5" />
                    <span className="font-medium">Science</span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Health & PE</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">HASS</span>
                  </div>
                  <div className="flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">The Arts</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">Technologies</span>
                  </div>
                  <div className="flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Languages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY TAUGHTFUL IS DIFFERENT */}
      <section className="py-24 px-4 bg-[#888625] text-white relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 font-mono hover:scale-105 transition-transform duration-500">
            Why Taughtful is Different
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-16 font-mono">
            Taughtful isn't a content generator. It's your co-designer.
          </p>

          <div className="space-y-10 text-left max-w-3xl mx-auto">
            {[
              {
                icon: "🧩",
                text: "Scaffolds your thinking without drowning you in noise",
              },
              {
                icon: "💡",
                text: "Embeds reflection and trauma-informed practices naturally",
              },
              {
                icon: "✏️",
                text: "Built for teachers, not content marketers",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 group">
                <div className="text-4xl group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                <p className="text-xl font-medium font-sans group-hover:scale-105 transition-transform duration-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-white/10 rounded-3xl backdrop-blur-sm">
            <p className="text-xl font-medium italic font-sans">
              Where other tools feel like another admin chore, Taughtful becomes part of your professional rhythm —
              aligned to the real mess and magic of classroom life.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL THOUGHT */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed font-sans">
            If you've ever tried an "AI planning tool" and thought, "I could've just done this myself…" — you're not
            alone.
          </p>
          <p className="text-xl md:text-2xl text-foreground font-medium italic font-sans hover:scale-105 transition-transform duration-300 animate-fade-in delay-500">
            Taughtful was built for educators who don't need more fluff. Just tools that think with them, not for them.
          </p>
        </div>
      </section>

      {/* 9. YOUR TURN (FORM) */}
      <section className="py-32 px-4 bg-gradient-to-br from-muted/30 via-[#FDE5DA]/20 to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FD6585]/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-[#888625]/10 rounded-full blur-xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="bg-gradient-to-br from-white/80 via-[#FDE5DA]/60 to-white/80 rounded-3xl p-16 border-3 border-[#FD6585]/30 shadow-2xl backdrop-blur-sm hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FD6585]/5 via-transparent to-[#FF9A2E]/5 rounded-3xl"></div>
            <div className="absolute top-8 right-8 w-16 h-16 bg-[#888625]/20 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 bg-[#FD6585]/20 rounded-full blur-md animate-pulse delay-500"></div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-10 text-foreground font-mono group-hover:scale-105 transition-all duration-500 cursor-default">
                Ready to ditch the panic planning?
              </h2>

              <div className="max-w-3xl mx-auto space-y-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Email (required)"
                    type="email"
                    className="bg-white/90 border-3 hover:border-[#FD6585]/60 focus:border-[#FD6585] transition-all duration-500 rounded-2xl h-16 text-lg shadow-lg hover:shadow-xl hover:scale-105 font-medium"
                  />
                  <Input
                    placeholder="Name (required)"
                    className="bg-white/90 border-3 hover:border-[#FD6585]/60 focus:border-[#FD6585] transition-all duration-500 rounded-2xl h-16 text-lg shadow-lg hover:shadow-xl hover:scale-105 font-medium"
                  />
                </div>
                <Select>
                  <SelectTrigger className="bg-white/90 border-3 hover:border-[#FD6585]/60 focus:border-[#FD6585] transition-all duration-500 rounded-2xl h-16 text-lg shadow-lg hover:shadow-xl hover:scale-105 font-medium">
                    <SelectValue placeholder="Year levels (dropdown)" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-2 border-[#FD6585]/20">
                    <SelectItem value="primary" className="text-lg py-3 hover:bg-[#FD6585]/10 rounded-xl">
                      Primary (K-6)
                    </SelectItem>
                    <SelectItem value="secondary" className="text-lg py-3 hover:bg-[#FD6585]/10 rounded-xl">
                      Secondary (7-12)
                    </SelectItem>
                    <SelectItem value="both" className="text-lg py-3 hover:bg-[#FD6585]/10 rounded-xl">
                      Both Primary & Secondary
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Biggest planning headache (optional)"
                  className="bg-white/90 border-3 hover:border-[#FD6585]/60 focus:border-[#FD6585] transition-all duration-500 min-h-[140px] rounded-2xl text-lg shadow-lg hover:shadow-xl hover:scale-105 font-medium resize-none"
                />
              </div>

              <div className="flex flex-col items-center gap-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-12 py-6 text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group rounded-2xl border-2 border-white/20 hover:border-white/40 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                  <Zap className="mr-3 w-7 h-7 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10">Get Beta Access</span>
                  <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 group-hover:animate-bounce transition-all duration-300 relative z-10" />
                  <Sparkles className="absolute top-2 right-2 w-5 h-5 text-white/60 animate-pulse group-hover:animate-spin" />
                </Button>
                <p className="text-muted-foreground font-medium hover:text-foreground transition-all duration-500 text-lg hover:scale-105 cursor-default">
                  No card. No commitment. Just honesty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BUILT DIFFERENT */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-mono hover:scale-105 transition-transform duration-500">
              Built Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Built by teachers, for teachers",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Cultural safety protocols embedded",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy-first (no student data, ever)",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Your feedback shapes the product roadmap",
              },
            ].map((trust, index) => (
              <Card
                key={index}
                className="border-2 border-border/50 hover:border-[#FD6585]/30 transition-all duration-300 hover:shadow-xl group hover:scale-105 hover:-translate-y-2 bg-card/80 backdrop-blur-sm text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#FD6585]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#FD6585]/20 transition-all duration-300 mx-auto group-hover:scale-110 group-hover:rotate-12">
                    <div className="text-[#FD6585] group-hover:scale-125 transition-transform duration-300">
                      {trust.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-mono group-hover:text-[#FD6585] transition-colors duration-300">
                    {trust.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t-2 border-border/50 py-16 px-4 bg-[#333333] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-3 group">
              <div className="w-8 h-8 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Image
                  src="/images/taughtful-logo.png"
                  alt="Taughtful"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="text-xl font-bold font-mono group-hover:text-[#FD6585] transition-colors duration-300">
                Taughtful
              </span>
            </div>

            <div className="space-y-4 text-white/80 font-sans">
              <p className="hover:text-white transition-colors duration-300">
                Contact:{" "}
                <a href="mailto:hello@taughtful.com.au" className="hover:text-[#FD6585] transition-colors duration-300">
                  hello@taughtful.com.au
                </a>
              </p>
              <div className="flex justify-center gap-2 my-6">
                <div className="w-2 h-2 bg-[#FD6585] rounded-full"></div>
                <div className="w-2 h-2 bg-[#FF9A2E] rounded-full"></div>
                <div className="w-2 h-2 bg-[#888625] rounded-full"></div>
              </div>
              <p className="hover:text-white transition-colors duration-300">
                Built with respect for First Nations knowledge
              </p>
              <p className="hover:text-white transition-colors duration-300">
                For Australian teachers. For Australian classrooms.
              </p>
            </div>

            <div className="border-t border-white/20 pt-8 text-white/60 font-sans text-sm">
              <p>
                All Indigenous cultural materials displayed in Taughtful are used with proper attribution and within the
                scope of their original permissions. Taughtful does not modify, generate, or repurpose any cultural
                content and advises teachers to avoid doing so.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
