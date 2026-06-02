import { Eye, MessageCircle, ThumbsUp, Share2 } from 'lucide-react'
import Image from 'next/image'

type Post = {
  id: number
  title: string
  subtitle: string
  badge: string | null
  titleColor: string
  subtitleColor: string
  badgeColor?: string
  views: number
  comments: number
  likes: number
  shares: number
  excerpt: string
  artBackground: string
  image: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'World Antibiotic Awareness Week',
    subtitle: 'November 18–24',
    badge: 'Oxford Health NHS Foundation Trust',
    titleColor: '#1565C0',
    subtitleColor: '#1565C0',
    views: 9, comments: 6, likes: 20, shares: 14,
    excerpt: 'We train young leaders and community champions to translate antimicrobial resistance education into local languages, empowering communities across Africa to use antibiotics responsibly and safeguard the future of human and animal health.',
    artBackground: '#DDECF9',
    image: '/Impact.png',
  },
  {
    id: 2,
    title: 'Our time with antibiotics is running out.',
    subtitle: "CHANGE CAN'T WAIT",
    badge: null,
    titleColor: '#1A1A2E',
    subtitleColor: '#e55100',
    views: 9, comments: 6, likes: 20, shares: 14,
    excerpt: 'We train young leaders and community champions to translate antimicrobial resistance education into local languages, empowering communities across Africa to use antibiotics responsibly and safeguard the future of human and animal health.',
    artBackground: '#E7F7E7',
    image: '/Impact.png',
  },
  {
    id: 3,
    title: 'Antimicrobial Resistance Is A Global Concern!',
    subtitle: 'Falsified Antibiotics Cause Patient Harm and Lead to Mistrust in Health Systems and Damage Economies.',
    badge: "King's College London · Fight the Fakes",
    titleColor: '#ffffff',
    subtitleColor: '#FF8C00',
    badgeColor: '#FFD700',
    views: 9, comments: 6, likes: 20, shares: 14,
    excerpt: 'We train young leaders and community champions to translate antimicrobial resistance education into local languages, empowering communities across Africa to use antibiotics responsibly and safeguard the future of human and animal health.',
    artBackground: '#1F5DB5',
    image: '/Impact.png',
  },
]

function BlogHeroArt({ post }: { post: Post }) {
  return (
    <div
      className="relative overflow-hidden rounded-[14px] px-5 py-5 sm:px-7 sm:py-6"
      style={{ backgroundColor: post.artBackground }}
    >
      <div className="grid min-h-[230px] gap-6 md:grid-cols-[1.05fr_1fr] md:items-center">
        <div className="relative h-[180px] overflow-hidden rounded-[14px] bg-transparent md:h-[210px]">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>

        <div className="flex h-full flex-col justify-center text-left md:pr-4">
          {post.badge && (
            <div className="mb-3 text-right text-[0.72rem] font-bold uppercase leading-tight tracking-[0.02em] md:mb-5">
              <span style={{ color: post.badgeColor || '#64748B' }}>{post.badge}</span>
            </div>
          )}
          <div className="md:max-w-[260px] md:self-end">
            <h2
              className="mb-5 text-[1.6rem] font-extrabold leading-[1.15] text-[#1D2430] sm:text-[2rem]"
              style={{ color: post.titleColor }}
            >
              {post.title}
            </h2>
            <p
              className="text-[1.25rem] font-bold leading-[1.15] sm:text-[1.9rem]"
              style={{ color: post.subtitleColor }}
            >
              {post.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="fade-up rounded-[18px] border border-[#E8EDF5] bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_12px_30px_rgba(21,101,192,0.12)] sm:p-4">
      <BlogHeroArt post={post} />

      <div className="flex flex-wrap items-center justify-end gap-4 px-2 py-4 text-[0.68rem] text-[#8A93A4] sm:gap-5 sm:px-3">
        <span className="inline-flex items-center gap-1.5"><Eye size={12} /> {post.views} Views</span>
        <span className="inline-flex items-center gap-1.5"><MessageCircle size={12} /> {post.comments} Comments</span>
        <span className="inline-flex items-center gap-1.5"><ThumbsUp size={12} /> {post.likes} Likes</span>
        <span className="inline-flex items-center gap-1.5"><Share2 size={12} /> {post.shares} Shares</span>
      </div>

      <div className="border-t border-[#EDF1F6] px-2 pb-3 pt-4 sm:px-3">
        <p className="text-[0.84rem] leading-[1.85] text-[#444B59]">
          {post.excerpt}{' '}
          <a href="#" className="font-semibold text-[#1565C0] transition-colors hover:text-[#0D47A1] hover:underline">
            See more
          </a>
        </p>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-5 sm:py-14">
      <div className="mx-auto w-[80vw] max-w-[1100px]">
        <div className="flex flex-col gap-10 sm:gap-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
