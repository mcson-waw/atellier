/**
 * Lenis Smooth Scroll Initialization
 * Creates a buttery smooth scrolling experience
 */

import Lenis from 'lenis';

let lenis = null;

export function initLenis() {
    if (typeof window === 'undefined') return null;

    // Create Lenis instance
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Soft easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    // RAF loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make Lenis available globally for GSAP ScrollTrigger sync
    window.lenis = lenis;

    return lenis;
}

export function getLenis() {
    return lenis;
}

export function scrollTo(target, options = {}) {
    if (!lenis) return;

    lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
    });
}

export function stopLenis() {
    if (lenis) {
        lenis.stop();
    }
}

export function startLenis() {
    if (lenis) {
        lenis.start();
    }
}

export function destroyLenis() {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initLenis();
    });
}
