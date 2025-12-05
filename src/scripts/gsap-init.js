/**
 * GSAP + ScrollTrigger Initialization
 * Handles all scroll-based animations with nature-inspired easing
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom easing functions for organic feel
const easing = {
    gentle: 'power2.out',
    soft: 'power3.out',
    organic: 'expo.out',
    bounce: 'elastic.out(1, 0.5)',
};

// Default animation settings
const defaults = {
    duration: 1,
    ease: easing.soft,
};

/**
 * Initialize GSAP with Lenis integration
 */
export function initGSAP() {
    if (typeof window === 'undefined') return;

    // Set GSAP defaults
    gsap.defaults({
        duration: defaults.duration,
        ease: defaults.ease,
    });

    // Integrate Lenis with ScrollTrigger
    if (window.lenis) {
        window.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            window.lenis?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    // Initialize all animations
    initFadeUpAnimations();
    initFadeInAnimations();
    initScaleAnimations();
    initSlideAnimations();
    initStaggerAnimations();
    initParallaxAnimations();
    initHeroAnimations();

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
}

/**
 * Fade Up Animations
 */
function initFadeUpAnimations() {
    const elements = document.querySelectorAll('[data-animate="fade-up"]');

    elements.forEach((el) => {
        gsap.fromTo(el,
            {
                y: 60,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: easing.soft,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });
}

/**
 * Fade In Animations
 */
function initFadeInAnimations() {
    const elements = document.querySelectorAll('[data-animate="fade-in"]');

    elements.forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 1.2,
                ease: easing.gentle,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });
}

/**
 * Scale Up Animations
 */
function initScaleAnimations() {
    const elements = document.querySelectorAll('[data-animate="scale-up"]');

    elements.forEach((el) => {
        gsap.fromTo(el,
            {
                scale: 0.9,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: easing.organic,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });
}

/**
 * Slide Animations (left/right)
 */
function initSlideAnimations() {
    const slideLeft = document.querySelectorAll('[data-animate="slide-left"]');
    const slideRight = document.querySelectorAll('[data-animate="slide-right"]');

    slideLeft.forEach((el) => {
        gsap.fromTo(el,
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: easing.soft,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });

    slideRight.forEach((el) => {
        gsap.fromTo(el,
            { x: -60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: easing.soft,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });
}

/**
 * Stagger Children Animations
 */
function initStaggerAnimations() {
    const containers = document.querySelectorAll('[data-stagger]');

    containers.forEach((container) => {
        const children = container.children;
        const staggerDelay = container.dataset.stagger || 0.1;

        gsap.fromTo(children,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: easing.soft,
                stagger: parseFloat(staggerDelay),
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });
}

/**
 * Parallax Animations
 */
function initParallaxAnimations() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const direction = el.dataset.parallaxDirection || 'y';

        gsap.to(el, {
            [direction]: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el.parentElement || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    });

    // Background parallax images
    const parallaxBgs = document.querySelectorAll('[data-parallax-bg]');

    parallaxBgs.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxBg) || 0.3;

        gsap.to(el, {
            yPercent: speed * 30,
            ease: 'none',
            scrollTrigger: {
                trigger: el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    });
}

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;

    const heroTimeline = gsap.timeline({
        defaults: { ease: easing.organic, duration: 1.2 },
    });

    const heroTitle = hero.querySelector('[data-hero-title]');
    const heroSubtitle = hero.querySelector('[data-hero-subtitle]');
    const heroButton = hero.querySelector('[data-hero-button]');
    const heroScroll = hero.querySelector('[data-hero-scroll]');

    // Initial states
    gsap.set([heroTitle, heroSubtitle, heroButton, heroScroll].filter(Boolean), {
        opacity: 0,
        y: 40,
    });

    // Animate in sequence
    if (heroTitle) {
        heroTimeline.to(heroTitle, {
            opacity: 1,
            y: 0,
            duration: 1.2,
        }, 0.3);
    }

    if (heroSubtitle) {
        heroTimeline.to(heroSubtitle, {
            opacity: 1,
            y: 0,
            duration: 1,
        }, 0.6);
    }

    if (heroButton) {
        heroTimeline.to(heroButton, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, 0.9);
    }

    if (heroScroll) {
        heroTimeline.to(heroScroll, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, 1.2);
    }

    // Hero parallax on scroll
    const heroBg = hero.querySelector('[data-hero-bg]');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }
}

/**
 * Create a custom scroll-triggered animation
 */
export function createScrollAnimation(element, fromVars, toVars, triggerOptions = {}) {
    return gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            ...triggerOptions,
        },
    });
}

/**
 * Create a parallax effect
 */
export function createParallax(element, speed = 0.5, options = {}) {
    return gsap.to(element, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
            trigger: element.parentElement || element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            ...options,
        },
    });
}

/**
 * Refresh ScrollTrigger (call after dynamic content changes)
 */
export function refreshScrollTrigger() {
    ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTrigger instances (cleanup)
 */
export function killScrollTriggers() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// Export GSAP and ScrollTrigger for direct use
export { gsap, ScrollTrigger };

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    // Wait for Lenis to be ready
    window.addEventListener('load', () => {
        // Small delay to ensure Lenis is initialized
        setTimeout(initGSAP, 100);
    });
}
