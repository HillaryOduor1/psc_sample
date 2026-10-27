// src/pages/home/sections/HeroSection.tsx
import * as React from "react";
import { useContent } from '../../../content/useContext';
import { trackEvent } from '../../../analytics';
import { useNavigate } from 'react-router-dom';

type HeroHeadlinePart = { text: string; accent?: boolean; };
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
type HeroSectionContent = { slides?: SlideContent[]; };

var AUTOPLAY_MS = 5000;
var TRANSITION_LOCK_MS = 600;

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

function getHeadlineSizeClass(headline: HeroHeadlinePart[][] | undefined, isMobile: boolean): string {
  var length = getHeadlineLength(headline);
  var lineCount = headline ? headline.length : 0;

  if (isMobile) {
    if (length > 100 || lineCount > 3) return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl';
    if (length > 70) return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
    if (length > 50) return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
    return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl';
  }

  if (length > 100) return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
  if (length > 70) return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl';
  if (length > 50) return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl';
  return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl';
}

function getSubtextSizeClass(subtext: string | undefined): string {
  if (!subtext) return 'text-sm sm:text-base md:text-lg';
  if (subtext.length > 120) return 'text-xs sm:text-sm sm:text-base md:text-lg';
  if (subtext.length > 80) return 'text-sm sm:text-base md:text-lg xl:text-xl';
  return 'text-sm sm:text-base md:text-lg';
}

var HeroSection = function() {
  var contentResult = useContent();
  var content = contentResult ? contentResult.content : null;
  var hero = (content && content.hero) ? (content.hero as HeroSectionContent) : null;
  var navigate = useNavigate();

  var currentSlideState = React.useState(0);
  var currentSlide = currentSlideState[0];
  var setCurrentSlide = currentSlideState[1];

  var transitioningState = React.useState(false);
  var isTransitioning = transitioningState[0];
  var setIsTransitioning = transitioningState[1];

  var isMobileState = React.useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  var isMobile = isMobileState[0];
  var setIsMobile = isMobileState[1];

  var slideIntervalRef = React.useRef<number | null>(null);
  var touchStartXRef = React.useRef<number>(0);
  var touchStartTimeRef = React.useRef<number>(0);
  var isPausedRef = React.useRef<boolean>(false);

  var slides: SlideContent[] = (hero && hero.slides) ? hero.slides : [
    {
      badge: 'OUR VISION',
      headline: [[{ text: "A " }, { text: "Values-Driven", accent: true }], [{ text: "Citizen-Centric", accent: true }, { text: " Public Service" }]],
      subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
      primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about', secondaryLink: '/jobs',
      image: '/assets/Our Vision-psc image1.webp'
    },
    {
      badge: 'OUR MISSION',
      headline: [[{ text: "To Ensure an " }, { text: "Efficient", accent: true }, { text: ", " }], [{ text: "Effective", accent: true }, { text: ", " }, { text: "Ethical", accent: true }, { text: " & " }], [{ text: "Inclusive", accent: true }, { text: " Public Service" }], [{ text: "for Delivery of Quality Services" }]],
      subtext: 'Through continuous improvement, we aim to meet the evolving needs of citizens and uphold the highest standards of public service.',
      primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about', secondaryLink: '/jobs',
      image: '/assets/Our Mission-psc image2.webp'
    },
    {
      badge: 'CORE VALUES',
      headline: [[{ text: "Integrity, Innovation & Agility" }], [{ text: "Diversity, Inclusivity & Equity," }], [{ text: "Accountability & Transparency" }], [{ text: "Responsiveness, Teamwork" }]],
      subtext: 'We place a strong emphasis on understanding and meeting the needs of the public while maintaining the highest standards of integrity and accountability.',
      primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about', secondaryLink: '/jobs',
      image: '/assets/Core-Values-psc-image3.jpg'
    },
    {
      badge: 'SAY NO TO CORRUPTION',
      headline: [[{ text: "Report Any Incident of" }], [{ text: "Corruption And Unethical" }], [{ text: "Conduct Here !!", accent: true }]],
      subtext: 'The Commission does not charge for any Services, i.e Job Placements, Promotions, Approval of Instruments or Advisory',
      primaryButtonText: 'REPORT NOW', primaryLink: '/report-corruption',
      image: '/assets/Say No To Corruption-psc image4.webp'
    },
    {
      badge: 'CAUTION',
      headline: [[{ text: "The PSC Provides" }], [{ text: "Services Free of Charge", accent: true }]],
      subtext: 'Beware of fraudsters posing as PSC staff and soliciting money in exchange for our services such as shortlisting for advertised jobs, appointment, promotion, and disciplinary matters or appeals. The Commission provides services free of charge',
      image: '/assets/caution-psc image5.webp'
    },
    {
      badge: 'OUR MOTTO',
      headline: [[{ text: "Public - Service" }], [{ text: "with " }, { text: "Integrity", accent: true }]],
      subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
      primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
      primaryLink: '/about', secondaryLink: '/jobs',
      image: '/assets/our motto active-psc image6.webp'
    }
  ];

  var totalSlides = slides.length;

  React.useEffect(function() {
    function handleResize() { setIsMobile(window.innerWidth < 640); }
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  function renderHeadline(headline: HeroHeadlinePart[][] | undefined) {
    if (!headline) return null;
    return headline.map(function(line, lineIndex) {
      return (
        <div key={lineIndex} className="hero-headline-line">
          {line.map(function(part, partIndex) {
            return (
              <span key={partIndex} style={{ color: part.accent ? 'var(--psc-primary-container)' : '#ffffff' }}>
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
    if (window.navigator && window.navigator.vibrate) { try { window.navigator.vibrate(50); } catch (err) { } }
    if (slide.primaryLink) {
      if (slide.primaryLink.charAt(0) === '/') navigate(slide.primaryLink);
      else window.location.href = slide.primaryLink;
    }
  }

  function handleSecondary() {
    var slide = slides[currentSlide];
    trackEvent('cta_click_secondary');
    if (window.navigator && window.navigator.vibrate) { try { window.navigator.vibrate(50); } catch (err) { } }
    if (slide.secondaryLink) {
      if (slide.secondaryLink.charAt(0) === '/') navigate(slide.secondaryLink);
      else window.location.href = slide.secondaryLink;
    }
  }

  function goToSlide(index: number) {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(function() { setIsTransitioning(false); }, TRANSITION_LOCK_MS);
  }

  function nextSlide() { goToSlide((currentSlide + 1) % totalSlides); }
  function prevSlide() { goToSlide((currentSlide - 1 + totalSlides) % totalSlides); }

  function clearAutoplay() {
    if (slideIntervalRef.current) { window.clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
  }
  function startAutoplay() {
    clearAutoplay();
    if (isPausedRef.current) return;
    slideIntervalRef.current = window.setInterval(function() { nextSlide(); }, AUTOPLAY_MS);
  }

  React.useEffect(function() {
    startAutoplay();
    return function() { clearAutoplay(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  React.useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') { prevSlide(); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { nextSlide(); e.preventDefault(); }
    }
    window.addEventListener('keydown', handleKeyDown);
    return function() { window.removeEventListener('keydown', handleKeyDown); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  function handleMouseEnter() { isPausedRef.current = true; clearAutoplay(); }
  function handleMouseLeave() { isPausedRef.current = false; startAutoplay(); }

  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartTimeRef.current = new Date().getTime();
      isPausedRef.current = true;
      clearAutoplay();
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
    if (e.changedTouches.length > 0) {
      var deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      var deltaTime = new Date().getTime() - touchStartTimeRef.current;
      if (Math.abs(deltaX) > 50 && deltaTime < 600) {
        if (deltaX < 0) nextSlide();
        else prevSlide();
      }
      isPausedRef.current = false;
      startAutoplay();
    }
  }

  var currentSlideData = slides[currentSlide];
  var headlineSizeClass = getHeadlineSizeClass(currentSlideData.headline, isMobile);
  var subtextSizeClass = getSubtextSizeClass(currentSlideData.subtext);

  var mobileGradient = 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.35) 100%)';
  var desktopGradient = 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 100%)';

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden hero-viewport"
      style={{ backgroundColor: '#1a1c1c' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero Carousel"
      aria-roledescription="carousel"
    >
      {/*
       * The slide stack fills the *entire* section (absolute inset-0),
       * so images render from y=0 to y=100vh regardless of padding.
       * Content is a separate absolutely-positioned layer that sits
       * above the slides and gets its own padding via
       * .hero-content-wrap.
       */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map(function(slide, index) {
          var isActive = index === currentSlide;
          return (
            <div
              key={index}
              className="absolute inset-0 w-full h-full hero-slide"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 20 : 10,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image || '/assets/Our Vision-psc image1.webp'}
                alt={slide.badge || 'Hero slide'}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform'
                }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0"
                style={{ background: isMobile ? mobileGradient : desktopGradient }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Content overlay: full-height flex column centered vertically */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center hero-content-wrap">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <div className="max-w-[900px] hero-content-inner">
            {currentSlideData.badge && (
              <div className="mb-2 sm:mb-3 md:mb-4">
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                  {currentSlideData.badge}
                </span>
                <div className="mt-1 sm:mt-1.5 md:mt-2 flex h-[2px] md:h-[3px] w-[60px] sm:w-[70px] md:w-[110px]">
                  <span className="w-1/2" style={{ backgroundColor: 'var(--psc-primary-container)' }}></span>
                  <span className="w-1/2 bg-white"></span>
                </div>
              </div>
            )}

            <div className={headlineSizeClass + ' font-bold leading-[1.15] tracking-tight mb-2 sm:mb-3 md:mb-4 hero-headline'}>
              {renderHeadline(currentSlideData.headline)}
            </div>

            {currentSlideData.subtext && (
              <p className={subtextSizeClass + ' text-white/85 max-w-2xl mb-3 sm:mb-4 md:mb-6 leading-relaxed hero-subtext'}>
                {currentSlideData.subtext}
              </p>
            )}

            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {currentSlideData.primaryButtonText && (
                <button
                  type="button"
                  onClick={handlePrimary}
                  className="hero-btn inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm md:text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  style={{ backgroundColor: 'var(--psc-primary-container)' }}
                  onMouseEnter={function(e) { e.currentTarget.style.backgroundColor = '#d47d00'; }}
                  onMouseLeave={function(e) { e.currentTarget.style.backgroundColor = 'var(--psc-primary-container)'; }}
                >
                  {currentSlideData.primaryButtonText}
                  <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                </button>
              )}
              {currentSlideData.secondaryButtonText && (
                <button
                  type="button"
                  onClick={handleSecondary}
                  className="hero-btn inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm md:text-sm uppercase tracking-wide border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                  onMouseEnter={function(e) { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'; }}
                  onMouseLeave={function(e) { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'; }}
                >
                  {currentSlideData.secondaryButtonText}
                  <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="hero-nav-btn absolute left-2 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 text-white w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', ['--tw-ring-color' as any]: 'var(--psc-primary-container)' } as React.CSSProperties}
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="hero-nav-btn absolute right-2 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 text-white w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', ['--tw-ring-color' as any]: 'var(--psc-primary-container)' } as React.CSSProperties}
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
      </button>

      <div className="hero-dots absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-2">
        {slides.map(function(_, index) {
          var isActive = index === currentSlide;
          return (
            <button
              type="button"
              key={index}
              onClick={function() { goToSlide(index); }}
              className={'hero-dot rounded-full transition-all duration-300 focus:outline-none ' + (isActive ? 'w-5 sm:w-6 md:w-6 h-2.5 md:h-2.5' : 'w-2.5 h-2.5 md:w-2.5 md:h-2.5 bg-white/40 hover:bg-white/70')}
              style={{ backgroundColor: isActive ? 'var(--psc-primary-container)' : undefined, ['--tw-ring-color' as any]: 'var(--psc-primary-container)' } as React.CSSProperties}
              aria-label={'Go to slide ' + (index + 1)}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;


/*// src/pages/home/sections/HeroSection.tsx
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

var AUTOPLAY_MS = 5000;
var TRANSITION_LOCK_MS = 600;

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

function getHeadlineSizeClass(
  headline: HeroHeadlinePart[][] | undefined,
  isMobile: boolean
): string {
  var length = getHeadlineLength(headline);
  var lineCount = headline ? headline.length : 0;

  if (isMobile) {
    if (length > 100 || lineCount > 3) {
      return 'text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
    } else if (length > 70) {
      return 'text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl';
    } else if (length > 50) {
      return 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl';
    } else {
      return 'text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl';
    }
  }

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
  if (!subtext) return 'text-sm sm:text-base md:text-lg';
  if (subtext.length > 120) {
    return 'text-xs xs:text-sm sm:text-base md:text-lg';
  } else if (subtext.length > 80) {
    return 'text-sm sm:text-base md:text-lg xl:text-xl';
  } else {
    return 'text-sm sm:text-base md:text-lg';
  }
}

var HeroSection = function() {
  var contentResult = useContent();
  var content = contentResult ? contentResult.content : null;
  var hero = (content && content.hero) ? (content.hero as HeroSectionContent) : null;
  var navigate = useNavigate();

  var currentSlideState = React.useState(0);
  var currentSlide = currentSlideState[0];
  var setCurrentSlide = currentSlideState[1];

  var transitioningState = React.useState(false);
  var isTransitioning = transitioningState[0];
  var setIsTransitioning = transitioningState[1];

  var isMobileState = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  var isMobile = isMobileState[0];
  var setIsMobile = isMobileState[1];

  var slideIntervalRef = React.useRef<number | null>(null);
  var touchStartXRef = React.useRef<number>(0);
  var touchStartTimeRef = React.useRef<number>(0);
  var isPausedRef = React.useRef<boolean>(false);

  var slides: SlideContent[] = (hero && hero.slides) ? hero.slides : [
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

  // Track viewport width for mobile-specific sizing
  React.useEffect(function() {
    function handleResize() {
      var mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    }
    window.addEventListener('resize', handleResize);
    return function() {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    if (window.navigator && window.navigator.vibrate) {
      try { window.navigator.vibrate(50); } catch (err) { /* ignore / }
    }
    if (slide.primaryLink) {
      if (slide.primaryLink.charAt(0) === '/') {
        navigate(slide.primaryLink);
      } else {
        window.location.href = slide.primaryLink;
      }
    }
  }

  function handleSecondary() {
    var slide = slides[currentSlide];
    trackEvent('cta_click_secondary');
    if (window.navigator && window.navigator.vibrate) {
      try { window.navigator.vibrate(50); } catch (err) { /* ignore / }
    }
    if (slide.secondaryLink) {
      if (slide.secondaryLink.charAt(0) === '/') {
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
    }, TRANSITION_LOCK_MS);
  }

  function nextSlide() {
    var next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }

  function prevSlide() {
    var prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  }

  function clearAutoplay() {
    if (slideIntervalRef.current) {
      window.clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }

  function startAutoplay() {
    clearAutoplay();
    if (isPausedRef.current) return;
    slideIntervalRef.current = window.setInterval(function() {
      nextSlide();
    }, AUTOPLAY_MS);
  }

  // Autoplay lifecycle
  React.useEffect(function() {
    startAutoplay();
    return function() {
      clearAutoplay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // Keyboard navigation
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  function handleMouseEnter() {
    isPausedRef.current = true;
    clearAutoplay();
  }

  function handleMouseLeave() {
    isPausedRef.current = false;
    startAutoplay();
  }

  // Touch swipe support
  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartTimeRef.current = new Date().getTime();
      isPausedRef.current = true;
      clearAutoplay();
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
    if (e.changedTouches.length > 0) {
      var deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      var deltaTime = new Date().getTime() - touchStartTimeRef.current;
      // Swipe threshold: 50px and < 600ms
      if (Math.abs(deltaX) > 50 && deltaTime < 600) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isPausedRef.current = false;
      startAutoplay();
    }
  }

  function handleDotClick(index: number) {
    goToSlide(index);
  }

  function makeDotHandler(index: number) {
    return function() {
      handleDotClick(index);
    };
  }

  var currentSlideData = slides[currentSlide];
  var headlineSizeClass = getHeadlineSizeClass(currentSlideData.headline, isMobile);
  var subtextSizeClass = getSubtextSizeClass(currentSlideData.subtext);

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden hero-viewport"
      style={{ backgroundColor: '#1a1c1c' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero Carousel"
      aria-roledescription="carousel"
    >
      <div className="relative w-full h-full">
        {slides.map(function(slide, index) {
          var isActive = index === currentSlide;
          var slideHeadlineSize = getHeadlineSizeClass(slide.headline, isMobile);

          return (
            <div
              key={index}
              className="absolute inset-0 w-full h-full hero-slide"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 20 : 10,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
              aria-hidden={!isActive}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={slide.image || '/assets/Our Vision-psc image1.webp'}
                  alt={slide.badge || 'Hero slide'}
                  className="w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    willChange: 'transform'
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: isMobile
                      ? 'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.70) 45%, rgba(0,0,0,0.85) 100%)'
                      : 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 100%)'
                  }}
                ></div>
              </div>

              <div className="absolute inset-0 z-20 flex items-center hero-content-wrap">
                <div className="w-full px-4 xs:px-5 sm:px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto">
                  <div className="max-w-[900px] hero-content-inner">
                    {slide.badge && (
                      <div className="mb-2 xs:mb-3 md:mb-4">
                        <span className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-wider">
                          {slide.badge}
                        </span>
                        <div className="mt-1 xs:mt-1.5 md:mt-2 flex h-[2px] md:h-[3px] w-[60px] xs:w-[70px] md:w-[110px]">
                          <span className="w-1/2" style={{ backgroundColor: 'var(--psc-primary-container)' }}></span>
                          <span className="w-1/2 bg-white"></span>
                        </div>
                      </div>
                    )}

                    <div className={slideHeadlineSize + ' font-bold leading-[1.15] tracking-tight mb-2 xs:mb-3 md:mb-4 hero-headline'}>
                      {renderHeadline(slide.headline)}
                    </div>

                    {slide.subtext && (
                      <p className={subtextSizeClass + ' text-white/85 max-w-2xl mb-3 xs:mb-4 md:mb-6 leading-relaxed hero-subtext'}>
                        {slide.subtext}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 xs:gap-3 md:gap-4">
                      {slide.primaryButtonText && (
                        <button
                          type="button"
                          onClick={handlePrimary}
                          className="hero-btn inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 xs:px-5 xs:py-3 md:px-6 md:py-2.5 rounded-full text-white font-bold text-xs xs:text-sm md:text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                          style={{ backgroundColor: 'var(--psc-primary-container)' }}
                          onMouseEnter={function(e) {
                            e.currentTarget.style.backgroundColor = '#d47d00';
                          }}
                          onMouseLeave={function(e) {
                            e.currentTarget.style.backgroundColor = 'var(--psc-primary-container)';
                          }}
                        >
                          {slide.primaryButtonText}
                          <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                        </button>
                      )}
                      {slide.secondaryButtonText && (
                        <button
                          type="button"
                          onClick={handleSecondary}
                          className="hero-btn inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 xs:px-5 xs:py-3 md:px-6 md:py-2.5 rounded-full text-white font-bold text-xs xs:text-sm md:text-sm uppercase tracking-wide border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)'
                          }}
                          onMouseEnter={function(e) {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
                          }}
                          onMouseLeave={function(e) {
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
        type="button"
        onClick={prevSlide}
        className="hero-nav-btn absolute left-2 xs:left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 text-white w-9 h-9 xs:w-10 xs:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          ['--tw-ring-color' as any]: 'var(--psc-primary-container)'
        } as React.CSSProperties}
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="hero-nav-btn absolute right-2 xs:right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 text-white w-9 h-9 xs:w-10 xs:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          ['--tw-ring-color' as any]: 'var(--psc-primary-container)'
        } as React.CSSProperties}
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
      </button>

      <div className="hero-dots absolute bottom-3 xs:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-2">
        {slides.map(function(_, index) {
          var isActive = index === currentSlide;
          return (
            <button
              type="button"
              key={index}
              onClick={makeDotHandler(index)}
              className={
                'hero-dot rounded-full transition-all duration-300 focus:outline-none ' +
                (isActive
                  ? 'w-5 xs:w-6 md:w-6 h-2.5 md:h-2.5'
                  : 'w-2.5 h-2.5 md:w-2.5 md:h-2.5 bg-white/40 hover:bg-white/70')
              }
              style={{
                backgroundColor: isActive ? 'var(--psc-primary-container)' : undefined,
                ['--tw-ring-color' as any]: 'var(--psc-primary-container)'
              } as React.CSSProperties}
              aria-label={'Go to slide ' + (index + 1)}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;*/


/*// src/pages/home/sections/HeroSection.tsx
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

export default HeroSection;*/