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
type HeroSectionContent = { slides?: SlideContent[] };

/* ------------------------------------------------------------------
 * Timing (ms). TRANSITION_MS MUST match the .hero-slide opacity
 * transition declared in CSS (900ms).
 * ------------------------------------------------------------------ */
var AUTOPLAY_MS = 6000;
var TRANSITION_MS = 900;
var TRANSITION_LOCK_MS = TRANSITION_MS + 50;
var SWIPE_MIN_DISTANCE = 45;
var SWIPE_MAX_DURATION = 700;
var FALLBACK_IMAGE = '/assets/our-vision-psc-image1.webp';

var DEFAULT_SLIDES: SlideContent[] = [
  {
    badge: 'OUR VISION',
    headline: [[{ text: "A " }, { text: "Values-Driven", accent: true }], [{ text: "Citizen-Centric", accent: true }, { text: " Public Service" }]],
    subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
    primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
    primaryLink: '/about', secondaryLink: '/jobs',
    image: '/assets/our-vision-psc-image1.webp'
  },
  {
    badge: 'OUR MISSION',
    headline: [[{ text: "To Ensure an " }, { text: "Efficient", accent: true }, { text: ", " }], [{ text: "Effective", accent: true }, { text: ", " }, { text: "Ethical", accent: true }, { text: " & " }], [{ text: "Inclusive", accent: true }, { text: " Public Service" }], [{ text: "for Delivery of Quality Services" }]],
    subtext: 'Through continuous improvement, we aim to meet the evolving needs of citizens and uphold the highest standards of public service.',
    primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
    primaryLink: '/about', secondaryLink: '/jobs',
    image: '/assets/our-mission-psc-image2.webp'
  },
  {
    badge: 'CORE VALUES',
    headline: [[{ text: "Integrity, Innovation & Agility" }], [{ text: "Diversity, Inclusivity & Equity," }], [{ text: "Accountability & Transparency" }], [{ text: "Responsiveness, Teamwork" }]],
    subtext: 'We place a strong emphasis on understanding and meeting the needs of the public while maintaining the highest standards of integrity and accountability.',
    primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
    primaryLink: '/about', secondaryLink: '/jobs',
    image: '/assets/core-values-psc-image3.jpg'
  },
  {
    badge: 'SAY NO TO CORRUPTION',
    headline: [[{ text: "Report Any Incident of" }], [{ text: "Corruption And Unethical" }], [{ text: "Conduct Here !!", accent: true }]],
    subtext: 'The Commission does not charge for any Services, i.e Job Placements, Promotions, Approval of Instruments or Advisory',
    primaryButtonText: 'REPORT NOW', primaryLink: '/report-corruption',
    image: '/assets/say-no-to-corruption-psc-image4.webp'
  },
  {
    badge: 'CAUTION',
    headline: [[{ text: "The PSC Provides" }], [{ text: "Services Free of Charge", accent: true }]],
    subtext: 'Beware of fraudsters posing as PSC staff and soliciting money in exchange for our services such as shortlisting for advertised jobs, appointment, promotion, and disciplinary matters or appeals. The Commission provides services free of charge',
    image: '/assets/caution-psc-image5.webp'
  },
  {
    badge: 'OUR MOTTO',
    headline: [[{ text: "Public - Service" }], [{ text: "with " }, { text: "Integrity", accent: true }]],
    subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
    primaryButtonText: 'ABOUT PSC', secondaryButtonText: 'VIEW PROGRAMMES',
    primaryLink: '/about', secondaryLink: '/jobs',
    image: '/assets/our-motto-active-psc-image6.webp'
  }
];

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

function prefersReducedMotion(): boolean {
  try {
    return typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

var HeroSection = function () {
  var contentResult = useContent();
  var content = contentResult ? contentResult.content : null;
  var hero = (content && content.hero) ? (content.hero as HeroSectionContent) : null;
  var navigate = useNavigate();

  var slides: SlideContent[] =
    (hero && hero.slides && hero.slides.length > 0) ? hero.slides : DEFAULT_SLIDES;
  var totalSlides = slides.length;

  var viewStatePair = React.useState({ index: 0, dir: 1, prev: -1 });
  var viewState = viewStatePair[0];
  var setViewState = viewStatePair[1];
  var currentSlide = viewState.index;
  var slideDirection = viewState.dir;
  var previousSlide = viewState.prev;

  var currentSlideRef = React.useRef(0);
  var transitioningRef = React.useRef(false);
  var pausedRef = React.useRef(false);
  var totalSlidesRef = React.useRef(totalSlides);
  var autoTimerRef = React.useRef<number | null>(null);
  var lockTimerRef = React.useRef<number | null>(null);

  var reducedMotionState = React.useState<boolean>(function () { return prefersReducedMotion(); });
  var reduceMotion = reducedMotionState[0];

  var mobileState = React.useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  var isMobile = mobileState[0];
  var setIsMobile = mobileState[1];

  var touchStartXRef = React.useRef<number>(0);
  var touchStartTimeRef = React.useRef<number>(0);

  React.useEffect(function () { totalSlidesRef.current = totalSlides; }, [totalSlides]);

  React.useEffect(function () {
    function handleResize() { setIsMobile(window.innerWidth < 640); }
    window.addEventListener('resize', handleResize);
    return function () { window.removeEventListener('resize', handleResize); };
  }, []);

  function renderHeadline(headline: HeroHeadlinePart[][] | undefined) {
    if (!headline) return null;
    return headline.map(function (line, lineIndex) {
      return (
        <div key={lineIndex} className="hero-headline-line">
          {line.map(function (part, partIndex) {
            return (
              <span key={partIndex} className={part.accent ? 'hero-accent' : 'hero-plain'}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    });
  }

  function followLink(link: string | undefined) {
    if (!link) return;
    if (link.charAt(0) === '/') navigate(link);
    else window.location.href = link;
  }

  function handlePrimary() {
    var slide = slides[currentSlideRef.current];
    trackEvent('cta_click_primary');
    if (window.navigator && window.navigator.vibrate) {
      try { window.navigator.vibrate(50); } catch (err) { /* noop */ }
    }
    followLink(slide.primaryLink);
  }

  function handleSecondary() {
    var slide = slides[currentSlideRef.current];
    trackEvent('cta_click_secondary');
    if (window.navigator && window.navigator.vibrate) {
      try { window.navigator.vibrate(50); } catch (err) { /* noop */ }
    }
    followLink(slide.secondaryLink);
  }

  function commitSlide(index: number, dir: number) {
    if (transitioningRef.current) return;
    if (index === currentSlideRef.current) return;
    if (index < 0 || index >= totalSlidesRef.current) return;

    transitioningRef.current = true;

    var from = currentSlideRef.current;
    currentSlideRef.current = index;
    setViewState({ index: index, dir: dir, prev: from });

    if (lockTimerRef.current !== null) window.clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(function () {
      transitioningRef.current = false;
      lockTimerRef.current = null;
    }, TRANSITION_LOCK_MS);
  }

  function goToSlide(index: number) {
    if (index === currentSlideRef.current) return;
    var dir = index > currentSlideRef.current ? 1 : -1;
    commitSlide(index, dir);
    restartTimer();
  }

  function nextSlide() {
    var total = totalSlidesRef.current;
    if (total < 2) return;
    commitSlide((currentSlideRef.current + 1) % total, 1);
    restartTimer();
  }

  function prevSlide() {
    var total = totalSlidesRef.current;
    if (total < 2) return;
    commitSlide((currentSlideRef.current - 1 + total) % total, -1);
    restartTimer();
  }

  function advanceFromTimer() {
    if (pausedRef.current || transitioningRef.current) return;
    var total = totalSlidesRef.current;
    if (total < 2) return;
    commitSlide((currentSlideRef.current + 1) % total, 1);
  }

  function restartTimer() {
    if (autoTimerRef.current !== null) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (reduceMotion) return;
    if (totalSlidesRef.current < 2) return;

    autoTimerRef.current = window.setTimeout(function () {
      autoTimerRef.current = null;
      advanceFromTimer();
      restartTimer();
    }, AUTOPLAY_MS);
  }

  React.useEffect(function () {
    restartTimer();
    return function () {
      if (autoTimerRef.current !== null) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
        lockTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') { prevSlide(); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { nextSlide(); e.preventDefault(); }
    }
    window.addEventListener('keydown', handleKeyDown);
    return function () { window.removeEventListener('keydown', handleKeyDown); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMouseEnter() { pausedRef.current = true; }
  function handleMouseLeave() { pausedRef.current = false; }
  function handleFocusIn() { pausedRef.current = true; }
  function handleFocusOut() { pausedRef.current = false; }

  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartTimeRef.current = Date.now();
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
    if (e.changedTouches.length === 0) return;
    var deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    var deltaTime = Date.now() - touchStartTimeRef.current;
    if (Math.abs(deltaX) > SWIPE_MIN_DISTANCE && deltaTime < SWIPE_MAX_DURATION) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
  }

  React.useEffect(function () {
    function handleVisibilityChange() {
      pausedRef.current = !!document.hidden;
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return function () {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  var currentSlideData = slides[currentSlide] || slides[0];
  var headlineSizeClass = getHeadlineSizeClass(currentSlideData.headline, isMobile);
  var subtextSizeClass = getSubtextSizeClass(currentSlideData.subtext);
  var contentAnimClass =
    'max-w-[900px] hero-content-inner hero-content-anim ' +
    (slideDirection < 0 ? 'dir-prev' : 'dir-next');

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden hero-viewport"
      style={{ backgroundColor: '#1a1c1c' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocusIn}
      onBlur={handleFocusOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero Carousel"
      aria-roledescription="carousel"
    >
      <div className="hero-stage">
        {slides.map(function (slide, index) {
          var isActive = index === currentSlide;
          var isLeaving = !isActive && index === previousSlide;
          var slideClass = 'hero-slide' + (isActive ? ' is-active' : '') + (isLeaving ? ' is-leaving' : '');

          return (
            <div
              key={index}
              className={slideClass}
              role="group"
              aria-roledescription="slide"
              aria-label={'Slide ' + (index + 1) + ' of ' + totalSlides}
              aria-hidden={isActive ? undefined : true}
            >
              <img
                src={slide.image || FALLBACK_IMAGE}
                alt={slide.badge || 'PSC hero slide'}
                draggable={false}
                loading={index < 2 ? 'eager' : 'lazy'}
                /* LCP FIX: Tell browser this is the highest priority image */
                fetchPriority={index === 0 ? "high" : "low"}
                /* MOBILE FIX: Adjust object position so faces aren't cut off */
                style={{ objectPosition: isMobile ? 'center 30%' : 'center center' }}
              />
              <div className={'hero-slide-scrim' + (isMobile ? ' is-mobile' : '')} />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center hero-content-wrap">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <div key={currentSlide} className={contentAnimClass}>
            {currentSlideData.badge && (
              <div className="mb-2 sm:mb-3 md:mb-4">
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                  {currentSlideData.badge}
                </span>
                <div className="mt-1 sm:mt-1.5 md:mt-2 flex h-[2px] md:h-[3px] w-[60px] sm:w-[70px] md:w-[110px]">
                  <span className="hero-badge-accent w-1/2"></span>
                  <span className="hero-badge-plain w-1/2"></span>
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
                  className="hero-btn hero-btn-primary inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-2.5 rounded-full font-bold text-xs sm:text-sm md:text-sm uppercase tracking-wide"
                >
                  {currentSlideData.primaryButtonText}
                  <span className="material-symbols-outlined text-sm md:text-lg">arrow_forward</span>
                </button>
              )}
              {currentSlideData.secondaryButtonText && (
                <button
                  type="button"
                  onClick={handleSecondary}
                  className="hero-btn hero-btn-secondary inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-2.5 rounded-full font-bold text-xs sm:text-sm md:text-sm uppercase tracking-wide"
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
        className="hero-nav-btn absolute left-2 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center"
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="hero-nav-btn absolute right-2 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center"
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined text-lg md:text-2xl">chevron_right</span>
      </button>

      <div className="hero-dots absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map(function (_, index) {
          var isActive = index === currentSlide;
          return (
            <button
              type="button"
              key={index}
              onClick={function () { goToSlide(index); }}
              className={'hero-dot' + (isActive ? ' is-active' : '')}
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