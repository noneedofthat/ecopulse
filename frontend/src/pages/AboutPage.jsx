import { Leaf, Target, Eye, Users, Code } from 'lucide-react'

const team = [
  { role: 'Lead Developer', emoji: '👨‍💻' },
]

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'We surface verified environmental data from trusted sources without bias.',
  },
  {
    icon: Target,
    title: 'Accessibility',
    desc: 'Environmental awareness should be free and open to everyone, everywhere.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'We connect readers with NGOs and local actions that create real impact.',
  },
  {
    icon: Code,
    title: 'Open Source',
    desc: 'Built on open standards and free APIs. The planet deserves open tools.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="bg-forest-900 text-white py-16">
        <div className="page-container max-w-3xl">
          <div className="w-12 h-12 rounded-xl bg-forest-700 flex items-center justify-center mb-5">
            <Leaf size={22} className="text-forest-200 rotate-12" />
          </div>
          <h1 className="section-title text-white mb-4">About EcoPulse</h1>
          <p className="text-forest-300 text-lg leading-relaxed">
            EcoPulse is a free, open environmental news platform aggregating
            climate, biodiversity, and sustainability stories from around the world.
            We believe access to environmental information is a fundamental right.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="page-container py-14 max-w-4xl">
        <div className="card-bordered p-8 md:p-12 mb-10">
          <h2 className="section-title mb-4">Our Mission</h2>
          <p className="text-forest-700 text-lg leading-relaxed">
            To create a single, trustworthy destination where anyone — students,
            activists, policymakers, or curious citizens — can track the state of
            our planet and find meaningful ways to help.
          </p>
        </div>

        {/* Values */}
        <h2 className="section-title mb-8">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-forest-700" />
              </div>
              <div>
                <h3 className="font-semibold text-forest-900 mb-1">{title}</h3>
                <p className="text-forest-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack note */}
        <div className="bg-forest-100/80 rounded-2xl p-6 border border-forest-200">
          <h3 className="font-display text-lg font-bold text-forest-900 mb-2">Built With</h3>
          <p className="text-forest-700 text-sm leading-relaxed">
            React · Vite · Tailwind CSS · Node.js · Express · Supabase · Railway ·
            Vercel · Guardian API · OpenWeatherMap · Google Gemini AI · Leaflet.js
          </p>
        </div>
      </section>
    </div>
  )
}
