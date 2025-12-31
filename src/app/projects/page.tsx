"use client";
import { siteConfig } from "../../content";
import Link from "next/link";

export default function Projects() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.setProperty('--tilt-x', `${-y * 8}deg`);
    card.style.setProperty('--tilt-y', `${x * 8}deg`);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', `0deg`);
    e.currentTarget.style.setProperty('--tilt-y', `0deg`);
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Projects</h1>
      <p className="text-gray-400 mb-12">Showcasing my technical illusions and digital craftsmanship</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteConfig.projects.map((project) => (
          <div
            key={project.name}
            className={`sassy-card group relative flex flex-col ${project.isWinner ? 'winner-card' : ''}`}
            onMouseMove={e => handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            style={{ minHeight: 340 }}
          >
            {project.isWinner && (
              <div className="winner-badge">🥇</div>
            )}
            <div className="sassy-card-inner p-6 flex flex-col flex-1">
              {/* Title */}
              <h2 className="sassy-title">{project.name}</h2>
              {/* Description */}
              <p className="text-gray-300 mb-4 flex-1 text-base leading-relaxed">{project.description}</p>
              {/* Badges */}
              <div className="sassy-badges">
                {project.badges && project.badges.map((badge, i) => (
                  <span className="sassy-badge" key={i}>{badge}</span>
                ))}
              </div>
              {/* Dots */}
              <div className="sassy-dots">
                {project.colors.map((color, i) => (
                  <span
                    key={i}
                    className="sassy-dot"
                    style={{ backgroundColor: color, animationDelay: `${i * 0.3}s` }}
                  ></span>
                ))}
              </div>
              {/* Actions */}
              <div className="sassy-actions mt-4">
                <div className="relative">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="sassy-action-btn"
                    aria-label="GitHub Repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-300">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <span className="sassy-tooltip">View on GitHub</span>
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="sassy-action-btn"
                    aria-label="Live Project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-300">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
                    </svg>
                    <span className="sassy-tooltip">View Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href={siteConfig.about.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-lg hover:border-blue-400 hover:text-blue-400 transition"
        >
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
} 