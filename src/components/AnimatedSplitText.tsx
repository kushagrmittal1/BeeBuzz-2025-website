import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

type SplitType = 'chars' | 'words' | 'lines';

interface AnimatedSplitTextProps {
  children: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  type?: SplitType;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean | gsap.DOMTarget | ScrollTrigger.Vars;
  blur?: boolean;
}

const AnimatedSplitText: React.FC<AnimatedSplitTextProps> = ({
  children,
  className = '',
  tag = 'div',
  type = 'chars',
  duration = 1,
  stagger = 0.05,
  delay = 0,
  ease = 'power2.out',
  scrollTrigger = true,
  blur = true
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitText(ref.current, { type });
    let elements: any[] = [];
    if (type === 'chars') elements = split.chars;
    else if (type === 'words') elements = split.words;
    else if (type === 'lines') elements = split.lines;

    // Set initial state, including blur if enabled
    gsap.set(elements, { 
      opacity: 0, 
      y: 40, 
      filter: blur ? 'blur(8px)' : 'none' 
    });

    let animation: gsap.core.Tween | null = null;

    const animateProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      filter: blur ? 'blur(0px)' : 'none'
    };

    if (scrollTrigger) {
      animation = gsap.to(elements, {
        ...animateProps,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          ...(typeof scrollTrigger === 'object' ? scrollTrigger : {}),
        },
      });
    } else {
      animation = gsap.to(elements, animateProps);
    }

    return () => {
      split.revert();
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    };
  }, [children, type, duration, stagger, delay, ease, scrollTrigger, blur]);

  const Tag = tag as any;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default AnimatedSplitText;
