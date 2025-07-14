import React, { FC, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoPath from '/logogotittogo.png';

// --- TypeScript: Define the structure for a blog post ---
interface BlogPost {
  id: number;
  photo: string;
  title: string;
  date: string;
  author: string;
  preview: string;
  content: string;
}

// ⬇️ 1. I've kept your paths, just ensure they are correct for your project setup ⬇️
export const blogPosts: BlogPost[] = [
  {
    id: 2,
    photo: 'public/group-of-multi-ethnic-students-having-fun-pov-sel-2024-12-05-15-32-50-utc.jpg',
    title: "Our Vision for the Future",
    date: "July 12, 2025",
    author: "Jane Doe, CEO",
    preview: "The landscape of internships is changing, and we're at the forefront of that evolution. See what we have planned!",
    content: `<p>...</p>`
  },
  {
    id: 1,
    photo: 'public/the-best-part-of-campus-are-my-friends-2025-04-05-17-20-56-utc.jpg',
    title: "Welcome to the Blog!",
    date: "July 10, 2025",
    author: "The Team",
    preview: "Welcome to our official blog! This is where we'll share updates, news, and insights into our journey.",
    content: `<p>...</p>`
  },
  {
    id: 3,
    photo: 'public/the-best-part-of-campus-are-my-friends-2025-04-05-17-20-56-utc.jpg',
    title: "Top 5 Tips for a Great Internship",
    date: "July 08, 2025",
    author: "Alex Ray",
    preview: "Make the most of your internship experience with these five key tips from our career experts.",
    content: `<p>...</p>`
  }
];


// --- (FloatingShapes component remains the same) ---
const FloatingShapes: FC = () => {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 80 + 20;
      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 20 + 20}s`,
          animationDelay: `${Math.random() * 15}s`,
          backgroundColor: Math.random() > 0.5 ? '#4B3011' : '#F9F387',
          opacity: Math.random() * 0.15 + 0.05,
        },
      };
    });
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      {shapes.map(shape => (
        <div key={shape.id} className="absolute bottom-0 rounded-full animate-float" style={shape.style} />
      ))}
    </div>
  );
};


const NewsletterPage: FC = () => {
  const navigate = useNavigate();

  if (blogPosts.length === 0) {
    return (
      <div className="bg-[#FAE959] min-h-screen flex items-center justify-center text-[#4B3011]">
        No articles yet!
      </div>
    );
  }

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredArticle = sortedPosts[0];
  const otherArticles = sortedPosts.slice(1);

  return (
    <div className="bg-[#FAE959] min-h-screen pt-24 md:pt-32 relative overflow-hidden">
      <FloatingShapes />

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-[#FFFCF0] flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-200 shadow-md transition-all hover:scale-110 hover:border-[#4B3011] z-10"
        aria-label="Go back"
      >
        <svg className="w-6 h-6 text-[#4B3011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <img src={logoPath} alt="The Inside Scoop" className="h-24 w-auto mx-auto" />
          <p className="mt-4 text-lg text-[#4B3011]/80 font-semibold">
            Got It To Go – The Official Newsletter of You'll Get It
          </p>
        </div>

        {/* --- FEATURED ARTICLE --- */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase text-[#4B3011]/70 tracking-widest mb-4">Featured Post</h2>
          <Link to={`/newsletter/${featuredArticle.id}`} className="block group">
            {/* ⬇️ 2. REDESIGNED FEATURED POST WITH A LARGE, PROMINENT PHOTO ⬇️ */}
            <article className="bg-[#4B3011] rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-[#F9F387]/50 transition-all">
              {/* Photo is now on top */}
              <div className="w-full h-80 bg-[#2c1c08]">
                 <img 
                   src={featuredArticle.photo} 
                   alt={featuredArticle.title} 
                   className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                 />
              </div>
              {/* Text content is below */}
              <div className="p-8">
                <h3 className="text-3xl font-bold font-display text-[#F9F387] mb-3">
                  {featuredArticle.title}
                </h3>
                <p className="text-[#F9F387]/70 mb-6">{featuredArticle.preview}</p>
                <div className="inline-block bg-[#F9F387] group-hover:bg-white text-[#4B3011] font-bold py-3 px-6 rounded-xl border-b-4 border-[#4B3011]/20 group-hover:border-[#4B3011] transition-all">
                  Read Now &rarr;
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* --- ALL ARTICLES LIST --- */}
        {otherArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-display text-[#4B3011] mb-8">More Articles</h2>
            {/* ⬇️ 3. REDESIGNED LIST AS A RESPONSIVE GRID OF CARDS ⬇️ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map(post => (
                <Link to={`/newsletter/${post.id}`} key={post.id} className="block group">
                  <article className="bg-[#4B3011]/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-transparent hover:border-[#F9F387]/50 transition-all h-full flex flex-col overflow-hidden">
                    {/* Photo */}
                    <div className="w-full h-48 bg-[#2c1c08]">
                      <img 
                        src={post.photo} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      />
                    </div>
                    {/* Text content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold font-display text-lg text-[#F9F387] group-hover:text-white transition-colors mb-2 flex-grow">
                        {post.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-[#F9F387]/60">{post.date}</p>
                        <div className="font-semibold text-sm text-[#F9F387]/50 group-hover:text-white transition-colors">
                          Read &rarr;
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NewsletterPage;