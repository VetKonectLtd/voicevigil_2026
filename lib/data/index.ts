export const testimonials = [
  {
    quote:
      "The Voice Vigil Project gave me the confidence and knowledge to champion antimicrobial resistance awareness in my community, encouraging and advocating the responsible use of antimicrobials among those around me.",
    name: "Mamman Josephine Gogosaba",
    role: "Nigeria",
    avatar: "/testimonials/mamman-josephine-gogosaba.jpeg",
  },
  {
    quote:
      "The Voice Vigil Project empowered me to become a stronger advocate against antimicrobial resistance. As a Hausa Language Champion, I translated AMR messages into Hausa and raised awareness in my community, helping people understand the importance of responsible antibiotic use. I am proud to contribute to healthier communities through public health education.",
    name: "Ameer Sulaiman Aliyu",
    role: "Nigeria",
    avatar: "/testimonials/ameer-sulaiman-aliyu.jpeg",
  },
  {
    quote:
      "Working with the Voice Vigil Project in Gatundu, Kiambu, I saw firsthand how language can be a barrier to understanding AMR. I took complex medical jargon and translated it into simple, relatable terms that our local community could grasp. Seeing farmers walk away with a clear understanding of how to use antibiotics responsibly was deeply fulfilling, it proved that when people understand, they act.",
    name: "Joseph K.Kimaru ",
    role: "Kenya",
    avatar: "/testimonials/joseph-k.kimaru .jpeg",
  },

  {
    quote:
      "The Voice Vigil Project equipped me with the knowledge and confidence to raise awareness about antimicrobial resistance in my community. Through the program, I had the opportunity to visit two schools and support my colleagues during visits to two pharmacies, gaining valuable real-life public health experience and learning the importance of applying knowledge and skills in practical settings.",
    name: "Adam Sabo Musa",
    role: "Nigeria",
    avatar: "/testimonials/adam-sabo-musa.jpeg",
  },
  {
    quote:
      "Voice Vigil equipped me with practical skills in AMR communication and community engagement. Through the project, I supported AMR awareness activities and helped in the creation of awareness amongst livestock farmers, healthcare providers and secondary schools in Cross River State, Nigeria.",
    name: "Umet God'sgift",
    role: "Nigeria",
    avatar: "/testimonials/umet-god'sgift.jpeg",
  },
  {
    quote:
      "The Voice Vigil Project has greatly enhanced my understanding of antimicrobial resistance and strengthened my confidence as a community advocate. Through the knowledge and skills I gained, I have educated community members on the responsible use of antimicrobials and the importance of preventing antimicrobial resistance. I am proud to be part of this initiative and look forward to continuing to make a positive impact.",
    name: "Muhammad Ahmad Muhammad",
    role: "Nigeria",
    avatar: "/testimonials/muhammad-ahmad-muhammad.jpeg",
  },

  {
    quote:
      "The VoiceVigil Project empowered me to transform complex antimicrobial resistance messages into simple, relatable information in the Igbo language. This has enabled me to reach my community more effectively, promote responsible antimicrobial use, and inspire conversations that can help protect public health.",
    name: "Emmanuel Chinecherem Israel",
    role: "Nigeria",
    avatar: "/testimonials/emmanuel-chinecherem-israel.jpeg",
  },
  {
    quote:
      "Voice Vigil has significantly strengthened my capacity to advocate for health security and AMR awareness. The skills and knowledge I gained have empowered me to design and lead local digital campaigns and community outreach initiatives, helping others understand the critical importance of responsible antimicrobial use.",
    name: "Twinomwe Deborah ",
    role: "Uganda",
    avatar: "/testimonials/twinomwe-deborah.jpeg",
  },
  {
    quote:
      "As a Voice Vigil Champion in Uganda, the project has completely shifted my perspective on antimicrobial resistance  from a complex medical issue to a relatable 'One Health' challenge. Learning how to translate complex AMR concepts into our local languages has empowered me to teach my community how to use antibiotics responsibly through following prescription of drugs by the trained personnel, avoiding sharing drugs, avoiding self medication.",
    name: "Sandrah Nyangoma ",
    role: "Uganda",
    avatar: "/testimonials/sandrah-nyangoma.jpeg",
  },
];

export const champActions = [
  { text: "Translate AMR information into local languages" },
  { text: "Conduct community outreach in schools, teachers, and farms" },
  { text: "Create multilingual awareness materials" },
  { text: "Promote responsible antibiotic use in humans and animals" },
  { text: "Serve as trusted voices for antibiotic stewardship" },
];

export const orangeBtn =
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#FBA310] bg-[#FBA310] px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:border-[#E65100] hover:bg-[#E65100]";

export const blueBtn =
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#1565C0] bg-[#1565C0] px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:border-[#0D47A1] hover:bg-[#0D47A1]";

export const blueOutlineBtn =
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#BFD7ED] bg-white px-6 py-3 text-sm font-medium text-[#1565C0] shadow-sm transition-all hover:border-[#1565C0] hover:bg-[#1565C0] hover:text-white";

export const smallBtn = (variant: "orange" | "blue" | "blueOutline") => {
  const base =
    "inline-flex whitespace-nowrap rounded-[4px] px-4 py-2 text-[11px] font-medium transition-colors md:px-5 md:text-[12px]";
  if (variant === "orange")
    return `${base} border border-[#FBA310] bg-[#FBA310] text-white hover:border-[#E38F00] hover:bg-[#E38F00]`;
  if (variant === "blueOutline")
    return `${base} border border-[#2E5FD3] bg-white text-[#2E5FD3] hover:bg-[#F5F8FF]`;
  return `${base} border border-[#2E5FD3] bg-[#2E5FD3] text-white hover:bg-[#224DB4]`;
};
