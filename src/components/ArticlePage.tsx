import React, { FC } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from './NewsletterPage';

const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook for navigation
  const article = blogPosts.find(post => post.id === Number(id));

  // --- Cartoonish "Go Back" Button ---
  const GoBackButton = () => (
    <button
      onClick={() => navigate(-1)} // This takes you to the previous page in history
      className="absolute top-6 left-6 bg-white flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-200 shadow-md transition-all hover:scale-110 hover:border-yellit-primary animate-bounce-subtle"
      aria-label="Go back"
    >
      <svg className="w-6 h-6 text-yellit-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
    </button>
  );

  if (!article) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 px-4 bg-gray-50">
        <GoBackButton />
        <div className="text-7xl mb-4">😭</div>
        <h1 className="text-4xl font-bold font-display text-yellit-dark mb-4">Oops! Article not found.</h1>
        <p className="text-gray-600 mb-8">We couldn't find the article you were looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 relative">
      <GoBackButton />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article>
          <header className="mb-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold font-display text-yellit-dark tracking-tighter mb-4">
              {article.title}
            </h1>
            <div className="text-base text-gray-500">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>By {article.author}</span>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;