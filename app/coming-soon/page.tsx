import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FD6585]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#FF9A2E]/20 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-[#888625]/20 rounded-full blur-2xl animate-float delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#FD6585]/20 rounded-full blur-xl animate-float delay-500"></div>

        <div
          className="absolute top-16 left-1/4 w-12 h-12 text-[#FD6585]/30 animate-spin text-4xl flex items-center justify-center"
          style={{ animationDuration: "8s" }}
        >
          🕐
        </div>
        <div className="absolute bottom-16 right-1/4 w-10 h-10 text-[#FF9A2E]/30 animate-pulse text-3xl flex items-center justify-center">
          ✨
        </div>
        <div className="absolute top-1/2 right-16 w-8 h-8 text-[#888625]/30 animate-bounce text-2xl flex items-center justify-center">
          ⚡
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border-2 border-[#FD6585]/20">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-12 group">
            <div className="w-16 h-16 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Image
                src="/images/taughtful-logo.png"
                alt="Taughtful"
                width={64}
                height={64}
                className="rounded-full shadow-lg"
              />
            </div>
            <span className="text-3xl font-bold text-foreground font-mono group-hover:text-[#FD6585] transition-colors duration-300">
              Taughtful
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-black text-foreground font-mono mb-8 hover:scale-105 transition-all duration-500">
            Coming Soon
          </h1>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium mb-12 leading-relaxed">
            We're putting the finishing touches on something special for Australian educators.
          </p>

          {/* Features preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🧩",
                title: "Curriculum v9 Aligned",
                description: "Built specifically for Australian classrooms",
              },
              {
                icon: "💡",
                title: "Trauma-Informed",
                description: "Co-regulation and scaffolding built-in",
              },
              {
                icon: "✏️",
                title: "Teacher Authored",
                description: "You design, we support",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground font-mono mb-2 group-hover:text-[#FD6585] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-medium">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="space-y-8">
            <p className="text-xl text-foreground font-medium">Want to be notified when we launch?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/waitlist">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 rounded-2xl"
                >
                  <span className="mr-2">✨</span>
                  Join the Waitlist
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-bold border-2 hover:border-[#FD6585] hover:scale-110 hover:-translate-y-1 transition-all duration-500 rounded-2xl bg-transparent"
                >
                  <span className="mr-2">←</span>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Timeline hint */}
          <div className="mt-12 p-6 bg-[#FD6585]/10 rounded-2xl">
            <p className="text-lg font-medium text-foreground">
              Expected launch: <span className="font-bold text-[#FD6585]">Early 2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
