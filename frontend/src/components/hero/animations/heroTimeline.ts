import gsap from 'gsap';
import React from 'react';

export interface HeroRefs {
  container: React.RefObject<HTMLDivElement | null>;
  video: React.RefObject<HTMLVideoElement | null>;
  initialText: React.RefObject<HTMLDivElement | null>;
  finalText: React.RefObject<HTMLDivElement | null>;
  ctas: React.RefObject<HTMLDivElement | null>;
  hudStats: React.RefObject<HTMLDivElement | null>;
  cardDetect: React.RefObject<HTMLDivElement | null>;
  cardAssess: React.RefObject<HTMLDivElement | null>;
  cardPlan: React.RefObject<HTMLDivElement | null>;
  cardResilient: React.RefObject<HTMLDivElement | null>;
}

export const createHeroEntrance = (refs: HeroRefs) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Entrance animation sequence
  tl.from(refs.initialText.current, {
    opacity: 0,
    y: 30,
    duration: 1.5,
    delay: 0.2
  })
  .from([
    refs.cardDetect.current,
    refs.cardAssess.current,
    refs.cardPlan.current,
    refs.cardResilient.current
  ], {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.1
  }, "-=1.0")
  .from(refs.ctas.current, {
    opacity: 0,
    y: 20,
    duration: 0.8
  }, "-=0.6")
  .from(refs.video.current, {
    opacity: 0,
    y: 30,
    duration: 1.2
  }, "-=1.2");

  return tl;
};
