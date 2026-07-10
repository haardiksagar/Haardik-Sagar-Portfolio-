'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Intro.module.css';

interface IntroProps {
  /** Brand / name text revealed after the counter finishes */
  name?: string;
  /** Small eyebrow label shown above the counter */
  label?: string;
  /** How long the counter takes to reach 100 (seconds) */
  counterDuration?: number;
  /** Only play once per browser tab session (uses sessionStorage) */
  once?: boolean;
  /** Called the moment the intro has fully wiped away (or been skipped) */
  onComplete?: () => void;
}

export default function Intro({
  name = 'Studio',
  label = 'Loading',
  counterDuration = 2,
  once = true,
  onComplete,
}: IntroProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Decide once, on mount, whether the intro should play at all.
  useEffect(() => {
    if (once && typeof window !== 'undefined' && sessionStorage.getItem('intro-played')) {
      setShouldRender(false);
      if (typeof window !== 'undefined') (window as any).introFinished = true;
      window.dispatchEvent(new Event('introComplete'));
      onComplete?.();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shouldRender || !overlayRef.current) return;

    const finish = () => {
      if (once) sessionStorage.setItem('intro-played', 'true');
      setShouldRender(false);
      if (typeof window !== 'undefined') {
        (window as any).introFinished = true;
        window.dispatchEvent(new Event('introComplete'));
      }
      onComplete?.();
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, onComplete: finish });
      return;
    }

    const counter = { val: 0 };

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(counter, {
      val: 100,
      duration: counterDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(counter.val)).padStart(3, '0');
        }
        if (barRef.current) {
          barRef.current.style.width = `${counter.val}%`;
        }
      },
    })
      .to(counterRef.current, { yPercent: -110, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, '+=0.15')
      .to(barRef.current, { autoAlpha: 0, duration: 0.3 }, '<')
      .fromTo(
        nameRef.current,
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' },
        '+=0.05'
      )
      .to(nameRef.current, { y: -16, autoAlpha: 0, duration: 0.45, ease: 'power3.in' }, '+=0.75')
      .to(
        overlayRef.current,
        { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut', onComplete: finish },
        '-=0.05'
      );

    return () => {
      tl.kill();
    };
  }, [shouldRender, counterDuration, once]);

  const handleSkip = () => {
    tlRef.current?.progress(1);
  };

  if (!shouldRender) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.panels} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.panel} />
        ))}
      </div>

      <div className={styles.stage}>
        <span className={styles.eyebrow}>{label}</span>

        <span ref={counterRef} className={styles.counter} aria-hidden="true">
          000
        </span>

        <div ref={nameRef} className={styles.name} aria-hidden="true">
          {name.split('').map((char, i) => (
            <span key={i} className={styles.letterMask}>
              <span className={styles.letter}>{char === ' ' ? '\u00A0' : char}</span>
            </span>
          ))}
        </div>

        <div className={styles.track} aria-hidden="true">
          <div ref={barRef} className={styles.bar} />
        </div>
      </div>

      <button type="button" className={styles.skip} onClick={handleSkip}>
        Skip
      </button>

      <span className={styles.srOnly} role="status">
        {name} is loading
      </span>
    </div>
  );
}
