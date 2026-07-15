'use client';

import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling with manual animation
 * @param {number} offset - Offset from top (default 80px for fixed navbar)
 * @param {number} duration - Animation duration in ms (default 800ms)
 * @returns {function} scrollTo function that accepts an element ID
 */
export default function useSmoothScroll(offset = 80, duration = 800) {
  const scrollTo = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing function for smooth animation
    const easeInOutCubic = (t) => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [offset, duration]);

  return scrollTo;
}
