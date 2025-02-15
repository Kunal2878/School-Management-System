import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom'
import { 
  BookOpen, Users, Calendar, LineChart, 
  GraduationCap, Bell, ClipboardList,
  ArrowRight
} from 'lucide-react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

// Animated component
const AnimatedElement = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Smart Learning Management",
      description: "Interactive course delivery with real-time progress tracking"
    },
    {
      icon: Users,
      title: "Student Engagement",
      description: "Foster collaboration through discussion forums and group projects"
    },
    {
      icon: Calendar,
      title: "Advanced Scheduling",
      description: "AI-powered timetable management and event planning"
    },
    {
      icon: LineChart,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into academic performance and trends"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Automated alerts for assignments, events, and deadlines"
    },
    {
      icon: ClipboardList,
      title: "Digital Assessment",
      description: "Create and grade assessments with automated feedback"
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="w-full relative overflow-hidden">
        <div className="w-full mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <AnimatedElement>
              <main className="mt-10 mx-auto w-full px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Transform Your School</span>{' '}
                    <span className="block text-blue-400 xl:inline">Management Digitally</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Streamline administrative tasks, enhance communication, and improve learning outcomes with our comprehensive school management system.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/user-options" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 md:py-4 md:text-lg md:px-10">
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-12 ">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Powerful Features</h2>
              <p className="mt-4 text-xl text-gray-500">Everything you need to manage your educational institution</p>
            </div>
          </AnimatedElement>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <AnimatedElement key={index} delay={index * 100}>
                  <div className="pt-6">
                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-blue-400 rounded-md shadow-lg">
                            <feature.icon className="h-6 w-6 text-white" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <AnimatedElement>
        <div className="w-full bg-blue-400">
          <div className="w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex lg:flex-row flex-col lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-blue-200">Contact us today.</span>
            </h2>
            <div className="w-full lg:w-auto mt-8 flex justify-center lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow ">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default LandingPage;