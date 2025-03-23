
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="text-8xl mb-4 animate-bounce">🙃</div>
        <h1 className="text-6xl font-display font-bold text-internmate-purple">404</h1>
        <p className="text-2xl font-medium mb-8">Oops! This page is on an internship.</p>
        <p className="text-lg opacity-70 mb-8">
          The page you're looking for is either gaining valuable work experience elsewhere 
          or doesn't exist at all.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
