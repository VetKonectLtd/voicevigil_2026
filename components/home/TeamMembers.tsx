import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  { name: "Ismail Yusuf Olumoh", role: "Team Lead", image: "/team/team1.png" },
  { name: "Dr. Jacob Undo", role: "Co-Team Lead", image: "/team/team2.png" },
  { name: "Bramwel James", role: "Capacity Building & Advocacy", image: "/team/team3.png" },
  { name: "OYELADE Blessing", role: "Project Manager", image: "/team/team4.png" },
  // Add additional members as needed (e.g., team5.png, team6.png)
];

const ITEMS_PER_PAGE = 4;

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(teamMembers.length / ITEMS_PER_PAGE);

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentMembers = teamMembers.slice(
    currentIndex * ITEMS_PER_PAGE,
    (currentIndex + 1) * ITEMS_PER_PAGE,
  );

  return (
    <section className="py-16 px-8 bg-white text-center font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">The Team</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
          Voice Vigil collaborates with universities, Veterinary professionals, public health
          experts, and community organisations to expand access to AMR education
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {currentMembers.map((member, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-80 w-full relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Cloud/Fog Bottom Fade Effect */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
              </div>

              {/* Text Container Overlaid on Card Bottom */}
              <div className="absolute bottom-4 inset-x-0 px-4 text-center z-10">
                <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-2 bg-slate-800" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed text-slate-400"
                : "hover:bg-slate-50 text-slate-700 shadow-sm"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= totalPages - 1}
            className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all ${
              currentIndex >= totalPages - 1
                ? "opacity-40 cursor-not-allowed text-slate-400"
                : "hover:bg-slate-50 text-slate-700 shadow-sm"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
