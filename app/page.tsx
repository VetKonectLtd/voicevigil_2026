'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PartnerFormModal from '@/components/PartnerFormModal'

const champActions = [
  { text: 'Translate AMR information into local languages' },
  { text: 'Conduct community outreach in schools, teachers, and farms' },
  { text: 'Create multilingual awareness materials' },
  { text: 'Promote responsible antibiotic use in humans and animals' },
  { text: 'Serve as trusted voices for antibiotic stewardship' },
]

const testimonials = [
  {
    quote: 'On the Windows talking painted picture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Dr. Amechi Anayor',
    role: 'Lagos, Nigeria',
    avatar: '🧑🏾‍⚕️',
  },
  {
    quote: 'Before Voice Vigil, we used antibiotics without clear guidance. Now our poultry cooperative follows safer practices and sees fewer losses.',
    name: 'Amina Yusuf',
    role: 'Kano, Nigeria',
    avatar: '👩🏾‍🌾',
  },
  {
    quote: 'The local-language sessions made everything easier to understand. Parents and students now ask informed questions before using medicines.',
    name: 'Peter Okello',
    role: 'Kampala, Uganda',
    avatar: '👨🏿‍🏫',
  },
]

const orangeBtn = 'inline-flex whitespace-nowrap rounded-lg border border-[#FBA310] bg-[#FBA310] px-[22px] py-[10px] text-sm font-semibold text-white transition-all hover:border-[#E65100] hover:bg-[#E65100]'
const blueBtn = 'inline-flex whitespace-nowrap rounded-lg border border-[#1565C0] bg-[#1565C0] px-[22px] py-[10px] text-sm font-semibold text-white transition-all hover:border-[#0D47A1] hover:bg-[#0D47A1]'
const blueOutlineBtn = 'inline-flex whitespace-nowrap rounded-lg border border-[#1565C0] bg-transparent px-[22px] py-[10px] text-sm font-semibold text-[#1565C0] transition-all hover:bg-[#1565C0] hover:text-white'
const smallBtn = (variant: 'orange' | 'blue' | 'blueOutline') => {
  const base = 'inline-flex whitespace-nowrap rounded-[4px] px-4 py-2 text-[11px] font-medium transition-colors md:px-5 md:text-[12px]'
  if (variant === 'orange') return `${base} border border-[#FBA310] bg-[#FBA310] text-white hover:border-[#E38F00] hover:bg-[#E38F00]`
  if (variant === 'blueOutline') return `${base} border border-[#2E5FD3] bg-white text-[#2E5FD3] hover:bg-[#F5F8FF]`
  return `${base} border border-[#2E5FD3] bg-[#2E5FD3] text-white hover:bg-[#224DB4]`
}

export default function HomePage() {
  const [activeTestimony, setActiveTestimony] = useState(0)
  const [isPartnerModalOpen, setPartnerModalOpen] = useState(false)

  const prev = () => setActiveTestimony((p) => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setActiveTestimony((p) => (p + 1) % testimonials.length)

  return (
    <main>
      {/* Hero */}
      <section className="fade-up px-5 py-12 text-center sm:px-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <h1 className="mb-5 text-[20px] font-bold leading-[1.25] text-[#1A1A2E] md:text-[30px]">
            Amplifying <span className="text-[#1565C0]">Antimicrobial Resistance</span> Awareness
            <br />
            through <span className="text-[#FF6D00]">Local Languages</span>
          </h1>
          <p className="mx-auto mb-8 max-w-[620px] text-base text-[#444]">
            We train young leaders and community champions to translate antimicrobial resistance
            education into local languages, empowering communities across Africa to use antibiotics
            responsibly and safeguard the future of human and animal health.
          </p>

          {/* Phone mockup */}
          <div className="mx-auto mb-8 w-full max-w-[650px]">
            <div className="relative h-[190px]">
              <div className="absolute left-[6%] top-7 h-[122px] w-[39%] -rotate-[14deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute left-[22%] top-2 h-[132px] w-[30%] -rotate-[7deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute right-[22%] top-2 h-[132px] w-[30%] rotate-[7deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute right-[6%] top-7 h-[122px] w-[39%] rotate-[14deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute left-1/2 top-0 h-[136px] w-[34%] -translate-x-1/2 rounded-2xl bg-[#CFCFD2] shadow-[0_4px_10px_rgba(0,0,0,0.08)]" />
            </div>
            <div className="mt-1 flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D5D8E2]" />
              <span className="h-2 w-2 rounded-full bg-[#1565C0]" />
              <span className="h-2 w-2 rounded-full bg-[#D5D8E2]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className={orangeBtn}>Access Resources</button>
            <button className={blueOutlineBtn}>Become a Language Champion</button>
            <button className={blueBtn} onClick={() => setPartnerModalOpen(true)}>
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      <PartnerFormModal isOpen={isPartnerModalOpen} onClose={() => setPartnerModalOpen(false)} />

      {/* Powered By */}
      <section className="px-5 py-8 text-center sm:px-10">
        <p className="mb-12 text-[15px] font-bold uppercase text-[#000000] md:text-[20px]">
          Powered By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-12">
          <Image src="/voicevigil.png" alt="VoiceVigil" width={128} height={128} className="h-32 w-auto object-contain" />
          <div className="rounded-xl bg-[#D9D9D959] p-3">
            <Image src="/trinity.png" alt="Trinity" width={128} height={128} className="h-32 w-auto object-contain" />
          </div>
          <Image src="/vetkonect.png" alt="VetKonect" width={128} height={128} className="h-32 w-auto object-contain" />
        </div>
      </section>

      {/* Problem section */}
      <section className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-10 max-w-[700px] text-[20px] font-bold leading-[1.25] md:text-[27px]">
          <span className="text-[#1565C0]">
            Antimicrobial Resistance is <span className="text-[#FF6D00]">Rising</span>
          </span>
          , but Millions can&apos;t Access the Information they need in their{' '}
          <span className="text-[#1565C0]">Local Language</span>
        </h2>

        <div className="relative mx-auto mb-10 flex max-w-[980px] flex-col items-center gap-5 md:min-h-[250px] md:flex-row md:items-start md:justify-center md:gap-6">
          <div className="pointer-events-none absolute left-[23%] top-6 hidden h-10 w-16 rounded-t-full border-l border-t border-[#ECECEC] md:block" />
          <div className="pointer-events-none absolute right-[23%] top-6 hidden h-10 w-16 rounded-t-full border-r border-t border-[#ECECEC] md:block" />
          <div className="flex min-h-[120px] w-full max-w-[250px] items-center justify-center rounded-[18px] border border-[#B9CCFF] bg-white px-6 py-7 text-center text-[0.9rem] leading-[1.45] text-[#343434] md:mt-10">
            <p>Across many African communities, the problem is worsened by a critical barrier: language.</p>
          </div>
          <div className="flex min-h-[210px] w-full max-w-[430px] items-center justify-center rounded-[18px] border border-[#7A98FF] bg-white px-8 py-7 text-center text-[0.92rem] leading-[1.45] text-[#343434]">
            <p>
              Antimicrobial resistance (AMR) is one of the greatest threats to global health today.
              Misuse of antibiotics in humans and animals is accelerating resistance, making infection
              harder, and sometimes impossible to treat.
            </p>
          </div>
          <div className="flex min-h-[155px] w-full max-w-[285px] items-center justify-center rounded-[18px] border border-[#F4BB5E] bg-white px-6 py-7 text-center text-[0.9rem] leading-[1.45] text-[#343434] md:mt-10">
            <p>
              Most AMR education is only available in English or French while millions of farmers,
              pet owners, traders and families primarily speak local languages.
            </p>
          </div>
        </div>

        <p className="text-[15px] text-[#333333]">
          ~This is not just a <span className="text-[#4E9A51]">health</span>{' '}
          <span className="text-[#F5A623]">crisis</span>, it&apos;s a{' '}
          <span className="text-[#1565C0]">communication</span>{' '}
          <span className="text-[#F5A623]">crisis.</span>
        </p>
      </section>

      {/* Solution */}
      <section className="bg-[#CCDCFF1A] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-10 max-w-[540px] text-[1.7rem] font-bold leading-[1.15] text-[#242A35] md:text-[2rem]">
          <span className="text-[#1565C0]">Our Solution:</span> The Voice Vigil Language Champion
          Initiative
        </h2>

        <div className="mx-auto mb-12 grid max-w-[920px] items-center gap-10 text-left md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div className="max-w-[430px] justify-self-start">
            <p className="text-[1rem] leading-[1.9] text-[#343B47]">
              Voice Vigil empowers young leaders and community members to become AMR Language
              Champions, trusted advocates trained to translate antimicrobial resistance education
              into local languages and culturally relevant messages.
            </p>
          </div>
          <div className="relative mx-auto h-[210px] w-full max-w-[300px]">
            <div className="absolute left-0 top-0 h-[140px] w-[68%] rounded-2xl bg-[#D8D8D8]" />
            <div className="absolute bottom-0 right-0 h-[140px] w-[68%] rounded-2xl bg-[#D8D8D8]" />
          </div>
        </div>

        <p className="mb-12 text-[0.95rem] font-medium text-[#2A2F39]">~Our Language Champions:</p>

        <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-6">
          {champActions.map((action, index) => {
            const posClass =
              index === 3
                ? 'lg:col-start-2 lg:col-span-2'
                : index === 4
                  ? 'lg:col-start-4 lg:col-span-2'
                  : 'lg:col-span-2'
            return (
              <div
                key={action.text}
                className={`flex min-h-[100px] items-center justify-center rounded-[14px] border border-[#B9CCFF] bg-white px-10 py-10 text-center text-[0.76rem] leading-[1.35] text-[#333B47] ${posClass}`}
              >
                <p>{action.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mb-12 text-[1.55rem] font-bold leading-[1.25] md:text-[1.75rem]">
          Our <span className="text-[#1565C0]">Growing</span>{' '}
          <span className="text-[#FBA310]">Impact</span>
        </h2>
        <div className="relative left-1/2 right-1/2 w-full -translate-x-1/2">
          <Image src="/Impact.png" alt="Our growing impact" width={1100} height={500} className="h-auto w-full object-cover" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5F7FA] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mb-12 text-[1.55rem] font-bold leading-[1.25] text-[#1f2937] md:text-[1.75rem]">
          Real <span className="text-[#1565C0]">Voices</span>, Real{' '}
          <span className="text-[#FBA310]">Change</span>
        </h2>

        <div className="mx-auto max-w-[720px] overflow-hidden px-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeTestimony * 100}%)` }}
          >
            {testimonials.map((t) => (
              <article className="w-full shrink-0 px-2" key={t.name}>
                <div className="relative mx-auto flex max-w-[420px] flex-col items-center rounded-2xl border border-[#ECEEF2] bg-white px-6 pb-7 pt-9 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
                  <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#39B96F] bg-[#E9FFF1] text-lg">
                    {t.avatar}
                  </div>
                  <p className="mb-5 text-center text-[0.76rem] leading-[1.6] text-[#5C6472]">
                    &quot;{t.quote}&quot;
                  </p>
                  <p className="text-[0.9rem] font-semibold text-[#2B3240]">{t.name}</p>
                  <p className="mt-1 text-[0.68rem] text-[#7B8493]">{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to testimony ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${activeTestimony === i ? 'bg-[#1F2937]' : 'bg-[#D8DEE8]'}`}
              onClick={() => setActiveTestimony(i)}
              type="button"
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button onClick={prev} aria-label="Previous" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#A0A7B5] transition-colors hover:bg-[#F4F6FA]">
            <ArrowLeft size={14} strokeWidth={2.2} />
          </button>
          <button onClick={next} aria-label="Next" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-colors hover:bg-[#F4F6FA]">
            <ArrowRight size={14} strokeWidth={2.2} />
          </button>
        </div>
      </section>

      {/* Join section */}
      <section className="bg-white px-5 py-12 text-center sm:px-10 md:py-[72px]" id="partner">
        <h2 className="mb-3 text-[1.55rem] font-bold leading-[1.25] text-[#1F2937] md:text-[1.75rem]">
          Join the Movement to Protect Antibiotics
        </h2>
        <p className="mx-auto mb-8 max-w-[640px] text-[0.82rem] leading-[1.7] text-[#3F4754] md:text-[0.95rem]">
          Everyone has a role to play in safeguarding the future of antibiotics. You can join Voice
          Vigil as a Language Champion, partner with us, or support our mission to empower communities.
        </p>
        <div className="mx-auto mb-8 h-[140px] w-full max-w-[960px] rounded-[8px] bg-[#D9D9D9] sm:h-[180px] md:h-[210px]" />
        <div className="flex flex-wrap items-center justify-center gap-3 max-[600px]:flex-col">
          <button className={smallBtn('orange')}>Access Resources</button>
          <button className={smallBtn('blueOutline')}>Become a Language Champion</button>
          <button className={smallBtn('blue')}>Partner With Us</button>
          <button className={smallBtn('blue')}>Support the Project</button>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-full bg-[#FBFBFB] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-3 max-w-[760px] text-[1.55rem] font-bold leading-[1.2] text-[#1F2937] md:text-[1.9rem]">
          Our Partners and Supporters
        </h2>
        <p className="mx-auto mb-8 max-w-[690px] text-[0.78rem] leading-[1.7] text-[#3F4754] md:text-[0.92rem]">
          Voice Vigil collaborates with universities, Veterinary professionals, public health
          experts, and community organizations to expand access to AMR education.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-12">
          <Image src="/voicevigil.png" alt="VoiceVigil" width={128} height={128} className="h-32 w-auto object-contain" />
          <div className="rounded-xl bg-[#D9D9D959] p-3">
            <Image src="/trinity.png" alt="Trinity" width={128} height={128} className="h-32 w-auto object-contain" />
          </div>
          <Image src="/vetkonect.png" alt="VetKonect" width={128} height={128} className="h-32 w-auto object-contain" />
        </div>
      </section>

      {/* Future CTA */}
      <section className="bg-white px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-3 max-w-[760px] text-[1.55rem] font-bold leading-[1.2] text-[#1F2937] md:text-[1.9rem]">
          The Future of Antibiotics Depends on What We Do Today
        </h2>
        <p className="mx-auto mb-8 max-w-[690px] text-[0.78rem] leading-[1.7] text-[#3F4754] md:text-[0.92rem]">
          By empowering communities with knowledge in their own language, we can slow antimicrobial
          resistance and protect life-saving medicines for future generations.
        </p>
        <div className="mx-auto mb-6 h-[140px] w-full max-w-[980px] rounded-[8px] bg-[#D9D9D9] sm:h-[180px] md:h-[220px]" />
        <div className="flex justify-center gap-4 max-[600px]:flex-col max-[600px]:items-center">
          <button className={smallBtn('blueOutline')}>Contact Us</button>
          <button className={smallBtn('blue')}>Join Voice Vigil</button>
        </div>
      </section>
    </main>
  )
}
