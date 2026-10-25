// src/pages/home/sections/HeroSection.tsx
import * as React from "react";
import { useContent } from '../../../content/useContext';
import { trackEvent } from '../../../analytics';
import { useNavigate } from 'react-router-dom';

type HeroHeadlinePart = {
  text: string;
  accent?: boolean;
};

type SlideContent = {
  badge?: string;
  headline?: HeroHeadlinePart[][];
  subtext?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryLink?: string;
  secondaryLink?: string;
  image?: string;
};

type HeroSectionContent = {
  slides?: SlideContent[];
};

const HeroSection = function() {
  var { content } = useContent();
  var hero = (content && content.hero) ? (content.hero as HeroSectionContent) : null;
  var navigate = useNavigate();
  var [currentSlide, setCurrentSlide] = React.useState(0);
  var [isTransitioning, setIsTransitioning] = React.useState(false);
  var slideIntervalRef = React.useRef<number | null>(null);

  var slides: SlideContent[] = hero?.slides || [
    {
      badge: 'OUR VISION',
      headline: [
        [{ text: "A " }, { text: "Values-Driven", accent: true }],
        [{ text: "Citizen-Centric", accent: true }, { text: " Public Service" }]
      ],
      subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
      primaryButtonText: 'ABOUT PSC',
      secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about',
      secondaryLink: '/jobs',
      image: '/assets/Our Vision-psc image1.webp'
    },
    {
      badge: 'OUR MISSION',
      headline: [
        [{ text: "To Ensure an " }, { text: "Efficient", accent: true }, { text: ", " }],
        [{ text: "Effective", accent: true }, { text: ", " }, { text: "Ethical", accent: true }, { text: " & " }],
        [{ text: "Inclusive", accent: true }, { text: " Public Service" }],
        [{ text: "for Delivery of Quality Services" }]
      ],
      subtext: 'Through continuous improvement, we aim to meet the evolving needs of citizens and uphold the highest standards of public service.',
      primaryButtonText: 'ABOUT PSC',
      secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about',
      secondaryLink: '/jobs',
      image: '/assets/Our Mission-psc image2.webp'
    },
    {
      badge: 'CORE VALUES',
      headline: [
        [{ text: "Integrity, Innovation & Agility" }],
        [{ text: "Diversity, Inclusivity & Equity," }],
        [{ text: "Accountability & Transparency" }],
        [{ text: "Responsiveness, Teamwork" }]
      ],
      subtext: 'We place a strong emphasis on understanding and meeting the needs of the public while maintaining the highest standards of integrity and accountability.',
      primaryButtonText: 'ABOUT PSC',
      secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about',
      secondaryLink: '/jobs',
      // FIXED: Added %20 for spaces and .JPG extension to match your file
      image: '/assets/Core-Values-psc-image3.JPG'
    },
    {
      badge: 'SAY NO TO CORRUPTION',
      headline: [
        [{ text: "Report Any Incident of" }],
        [{ text: "Corruption And Unethical" }],
        [{ text: "Conduct Here !!", accent: true }]
      ],
      subtext: 'The Commission does not charge for any Services, i.e Job Placements, Promotions, Approval of Instruments or Advisory',
      primaryButtonText: 'REPORT NOW',
      primaryLink: '/report-corruption',
      image: '/assets/Say No To Corruption-psc image4.webp'
    },
    {
      badge: 'CAUTION',
      headline: [
        [{ text: "The PSC Provides" }],
        [{ text: "Services Free of Charge", accent: true }]
      ],
      subtext: 'Beware of fraudsters posing as PSC staff and soliciting money in exchange for our services such as shortlisting for advertised jobs, appointment, promotion, and disciplinary matters or appeals. The Commission provides services free of charge',
      image: '/assets/caution-psc image5.webp'
    },
    {
      badge: 'OUR MOTTO',
      headline: [
        [{ text: "Public - Service" }],
        [{ text: "with " }, { text: "Integrity", accent: true }]
      ],
      subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
      primaryButtonText: 'ABOUT PSC',
      secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about',
      secondaryLink: '/jobs',
      image: '/assets/our motto active-psc image6.webp'
    }
  ];

  var totalSlides = slides.length;

  function getHeadlineLength(headline: HeroHeadlinePart[][] | undefined): number {
    if (!headline) return 0;
    var count = 0;
    for (var i = 0; i < headline.length; i++) {
      for (var j = 0; j < headline[i].length; j++) {
        count += headline[i][j].text.length;
      }
    }
    return count;
  }

  function getHeadlineSizeClass(headline: HeroHeadlinePart[][] | undefined): string {
    var length = getHeadlineLength(headline);
    if (length > 100) {
      return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
    } else if (length > 70) {
      return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl';
    } else if (length > 50) {
      return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl';
    } else {
      return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl';
    }
  }

  function getSubtextSizeClass(subtext: string | undefined): string {
    if (!subtext) return 'text-base sm:text-lg md:text-xl';
    if (subtext.length > 120) {
      return 'text-sm sm:text-base md:text-lg';
    } else if (subtext.length > 80) {
      return 'text-sm sm:text-base md:text-lg xl:text-xl';
    } else {
      return 'text-base sm:text-lg md:text-xl';
    }
  }

  function renderHeadline(headline: HeroHeadlinePart[][] | undefined) {
    if (!headline) return null;
    return headline.map(function(line, lineIndex) {
      return (
        <div key={lineIndex} className="hero-headline-line">
          {line.map(function(part, partIndex) {
            return (
              <span 
                key={partIndex}
                style={{ 
                  color: part.accent ? 'var(--psc-primary-container)' : '#ffffff'
                }}
              >
                {part.text}
              </span>
            );
          })}
        </div>
      );
    });
  }

  function handlePrimary() {
    var slide = slides[currentSlide];
    trackEvent('cta_click_primary');
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
    if (slide.primaryLink) {
      if (slide.primaryLink.startsWith('/')) {
        navigate(slide.primaryLink);
      } else {
        window.location.href = slide.primaryLink;
      }
    }
  }

  function handleSecondary() {
    var slide = slides[currentSlide];
    trackEvent('cta_click_secondary');
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
    if (slide.secondaryLink) {
      if (slide.secondaryLink.startsWith('/')) {
        navigate(slide.secondaryLink);
      } else {
        window.location.href = slide.secondaryLink;
      }
    }
  }

  function goToSlide(index: number) {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(function() {
      setIsTransitioning(false);
    }, 600); // 600ms transition lock
  }

  function nextSlide() {
    var next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }

  function prevSlide() {
    var prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  }

  React.useEffect(function() {
    function startAutoplay() {
      if (slideIntervalRef.current) {
        window.clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
      slideIntervalRef.current = window.setInterval(function() {
        nextSlide();
      }, 5000); // 5 second autoplay timer
    }
    startAutoplay();
    return function() {
      if (slideIntervalRef.current) {
        window.clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
    };
  }, [currentSlide]);

  function handleMouseEnter() {
    if (slideIntervalRef.current) {
      window.clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }

  function handleMouseLeave() {
    if (slideIntervalRef.current) {
      window.clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
    slideIntervalRef.current = window.setInterval(function() {
      nextSlide();
    }, 5000);
  }

  React.useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return function() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  var currentSlideData = slides[currentSlide];
  var headlineSizeClass = getHeadlineSizeClass(currentSlideData.headline);
  var subtextSizeClass = getSubtextSizeClass(currentSlideData.subtext);

  return (
    <section 
      id="hero-section"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden -mt-16 md:-mt-20"
      style={{ backgroundColor: '#1a1c1c' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Hero Carousel"
    >
      <div className="relative w-full h-full">
        {slides.map(function(slide, index) {
          var isActive = index === currentSlide;
          var slideHeadlineSize = getHeadlineSizeClass(slide.headline);
          
          return (
            <div 
              key={index}
              className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 20 : 10,
              }}
              aria-hidden={!isActive}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  src={slide.image || '/assets/Our Vision-psc image1.webp'}
                  alt={slide.badge || 'Hero slide'}
                  className="w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />
                <div className="absolute inset-0 z-10" style={{
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 100%)'
                }}></div>
              </div>

              <div className="absolute inset-0 z-20 flex items-center">
                <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto">
                  <div className="max-w-[900px]">
                    {slide.badge && (
                      <div className="mb-3 md:mb-4">
                        <span className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-wider">
                          {slide.badge}
                        </span>
                        <div className="mt-1.5 md:mt-2 flex h-[2px] md:h-[3px] w-[80px] md:w-[110px]">
                          <span className="w-1/2" style={{ backgroundColor: 'var(--psc-primary-container)' }}></span>
                          <span className="w-1/2 bg-white"></span>
                        </div>
                      </div>
                    )}

                    <div className={`${slideHeadlineSize} font-bold leading-[1.1] tracking-tight mb-3 md:mb-4`}>
                      {renderHeadline(slide.headline)}
                    </div>

                    {slide.subtext && (
                      <p className={`${subtextSizeClass} text-white/85 max-w-2xl mb-4 md:mb-6 leading-relaxed`}>
                        {slide.subtext}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {slide.primaryButtonText && (
                        <button 
                          onClick={handlePrimary}
                          className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-white font-bold text-xs md:text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                          style={{ 
                            backgroundColor: 'var(--psc-primary-container)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#d47d00';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--psc-primary-container)';
                          }}
                        >
                          {slide.primaryButtonText} 
                          <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                        </button>
                      )}
                      {slide.secondaryButtonText && (
                        <button 
                          onClick={handleSecondary}
                          className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-white font-bold text-xs md:text-sm uppercase tracking-wide border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                          style={{ 
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                          }}
                        >
                          {slide.secondaryButtonText} 
                          <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 text-white w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.4)',
          '--tw-ring-color': 'var(--psc-primary-container)'
        } as React.CSSProperties}
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 text-white w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.4)',
          '--tw-ring-color': 'var(--psc-primary-container)'
        } as React.CSSProperties}
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
      </button>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 md:gap-2">
        {slides.map(function(_, index) {
          var isActive = index === currentSlide;
          return (
            <button
              key={index}
              onClick={function() { goToSlide(index); }}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 ${
                isActive ? 'w-4 md:w-6' : 'bg-white/40 hover:bg-white/70'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--psc-primary-container)' : undefined,
                '--tw-ring-color': 'var(--psc-primary-container)'
              } as React.CSSProperties}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;