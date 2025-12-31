import { siteConfig } from "../../content";
import Image from "next/image";
import Link from "next/link";

export default function Experience() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Experience</h1>
      <p className="text-gray-400 mb-12">My professional journey through the tech world</p>
      <div className="relative border-l-2 border-cyan-700/40 pl-8 space-y-16">
        {siteConfig.experience.map((exp) => (
          <div key={`${exp.company}-${exp.title}`} className="relative group">
            {/* Period pill on the left side */}
            <div className="absolute -left-32 top-10 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-cyan-900/80 to-purple-900/80 text-cyan-200 px-3 py-1 rounded-full text-sm font-medium border border-cyan-700/50 shadow-lg backdrop-blur-sm whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            
            {/* Timeline dot with glow - positioned directly on the vertical line */}
            <span className="absolute -left-10.5 top-10 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 border-2 border-black shadow-xl animate-pulse" style={{ zIndex: 2 }}></span>
            
            <div className="bg-gradient-to-br from-[#18181b] via-[#1e293b] to-[#18181b] rounded-2xl p-8 shadow-2xl border border-cyan-900/30 group-hover:border-cyan-400 transition relative overflow-hidden">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-cyan-400 group-hover:shadow-[0_0_40px_0_rgba(34,211,238,0.3)] transition-all duration-300" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-cyan-800 flex items-center justify-center overflow-hidden shadow-md hover:border-cyan-400 transition-colors">
                    <Image src={exp.logo} alt={exp.company + ' logo'} width={48} height={48} className="object-contain" />
                  </Link>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-cyan-300 truncate"><a href={exp.link} target="_blank" rel="noopener noreferrer">{exp.company}</a></h2>
                    <p className="text-gray-400 text-sm md:text-base break-words">{exp.title}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <ul className="experience-highlight text-gray-300 space-y-2">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex items-start text-left break-words">
                      <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span className="break-words" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-200 border border-cyan-900/40 shadow-sm">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Decorative vertical gradient line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/60 via-purple-600/30 to-cyan-900/0 rounded-full pointer-events-none" style={{ zIndex: 1 }} />
      </div>
    </section>
  );
} 