import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"

export default function WaitlistSignup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] relative overflow-hidden flex items-center justify-center py-12">
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

      <div className="container mx-auto max-w-2xl px-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-[#FD6585]/20">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 group">
            <div className="w-12 h-12 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Image
                src="/images/taughtful-logo.png"
                alt="Taughtful"
                width={48}
                height={48}
                className="rounded-full shadow-lg"
              />
            </div>
            <span className="text-2xl font-bold text-foreground font-mono group-hover:text-[#FD6585] transition-colors duration-300">
              Taughtful
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-black text-foreground font-mono mb-4 text-center hover:scale-105 transition-all duration-500">
            Join the Waitlist
          </h1>

          <p className="text-lg text-muted-foreground font-medium mb-8 text-center leading-relaxed">
            Be the first to know when Taughtful launches. Get early access and help shape the future of Australian
            education.
          </p>

          {/* Signup Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-foreground mb-2">
                  First Name *
                </label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-foreground mb-2">
                  Last Name *
                </label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-bold text-foreground mb-2">
                School/Organization
              </label>
              <Input
                id="school"
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300"
                placeholder="Your school or organization"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-foreground mb-2">
                Teaching Role
              </label>
              <select
                id="role"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300 bg-white"
              >
                <option value="">Select your role</option>
                <option value="primary-teacher">Primary Teacher</option>
                <option value="secondary-teacher">Secondary Teacher</option>
                <option value="specialist-teacher">Specialist Teacher</option>
                <option value="head-teacher">Head Teacher</option>
                <option value="principal">Principal</option>
                <option value="curriculum-coordinator">Curriculum Coordinator</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="subjects" className="block text-sm font-bold text-foreground mb-2">
                Subjects You Teach
              </label>
              <Textarea
                id="subjects"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300 min-h-[100px]"
                placeholder="e.g., English, Mathematics, Science, HASS..."
              />
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-bold text-foreground mb-2">
                What interests you most about Taughtful?
              </label>
              <Textarea
                id="interests"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FD6585] focus:ring-0 transition-colors duration-300 min-h-[100px]"
                placeholder="Tell us what you're hoping to get from Taughtful..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="updates"
                className="mt-1 w-4 h-4 text-[#FD6585] border-2 border-gray-300 rounded focus:ring-[#FD6585]"
              />
              <label htmlFor="updates" className="text-sm text-muted-foreground">
                I'd like to receive updates about Taughtful's development and early access opportunities.
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 rounded-2xl"
            >
              <span className="mr-2">🚀</span>
              Join the Waitlist
            </Button>
          </form>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/coming-soon"
              className="text-[#FD6585] hover:text-[#FD6585]/80 font-medium transition-colors duration-300"
            >
              ← Back to Coming Soon
            </Link>
          </div>

          {/* Privacy note */}
          <div className="mt-8 p-4 bg-[#FD6585]/10 rounded-xl">
            <p className="text-sm text-muted-foreground text-center">
              We respect your privacy. Your information will only be used to notify you about Taughtful's launch and
              won't be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
