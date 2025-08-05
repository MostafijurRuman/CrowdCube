import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { Fade, Bounce } from 'react-awesome-reveal';

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent-purple/10 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Bounce triggerOnce>
          <div className="mb-8">
            <FaExclamationTriangle className="text-8xl md:text-9xl text-accent-red mx-auto mb-6 animate-pulse" />
          </div>
        </Bounce>
        
        <Fade direction="up" triggerOnce cascade>
          <div className="bg-card-bg rounded-3xl shadow-2xl p-8 md:p-12 border border-divider">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-poppins mb-4">
              Oops!
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary font-poppins mb-6">
              {error?.status === 404 ? "Page Not Found" : "Something went wrong"}
            </h2>
            
            <p className="text-lg md:text-xl text-text-secondary font-inter mb-8 leading-relaxed">
              {error?.status === 404 
                ? "The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL."
                : error?.statusText || error?.message || "An unexpected error occurred. Please try again later."
              }
            </p>
            
            {error?.status && (
              <div className="inline-block bg-accent-red/10 text-accent-red px-6 py-3 rounded-full font-bold text-lg mb-8">
                Error {error.status}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold font-poppins text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaHome className="text-xl" />
                Go Home
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-3 bg-accent-purple hover:bg-accent-purple/90 text-white px-8 py-4 rounded-full font-bold font-poppins text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaArrowLeft className="text-xl" />
                Go Back
              </button>
            </div>
          </div>
        </Fade>
        
        <Fade direction="up" delay={500} triggerOnce>
          <div className="mt-12">
            <p className="text-text-secondary font-inter text-base md:text-lg">
              Need help? Contact our support team or visit our{" "}
              <Link 
                to="/all-campaigns" 
                className="text-primary hover:text-accent-purple font-semibold underline underline-offset-4 transition-colors"
              >
                campaigns page
              </Link>{" "}
              to explore amazing projects.
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ErrorPage;
