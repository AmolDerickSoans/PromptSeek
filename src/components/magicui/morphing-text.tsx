"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// Increased morphTime and cooldownTime for less frequent morphing
const morphTime = 1.5; // Increased from 1.5 to 3
const cooldownTime = 4; // Increased from 0.5 to 2

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  // Add a ref to track whether to cancel animation
  const cancelAnimationRef = useRef(false);

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      // Ensure we're using the full text string from the array
      current1.textContent = texts[textIndexRef.current % texts.length];
      // Only try to get the next text if it exists
      current2.textContent = (textIndexRef.current + 1) < texts.length ? 
        texts[(textIndexRef.current + 1)] : 
        texts[textIndexRef.current % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      // Check if we've exhausted all words
      if (textIndexRef.current + 1 >= texts.length - 1) {
        // Stop the animation by setting the flag
        cancelAnimationRef.current = true;
      } else {
        textIndexRef.current++;
      }
    }
  }, [setStyles, texts.length]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Don't request another frame if we should cancel
      if (!cancelAnimationRef.current) {
        animationFrameId = requestAnimationFrame(animate);
      }

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <div
    className={cn(
      // Increased text size from 40pt to 60pt and from 6rem to 8rem
      // Changed font-sans to font-serif
      // Increased height to accommodate full sentences and added word-wrap
      "relative mx-auto h-24 w-full max-w-screen text-center font-primary text-[20pt] font-bold leading-tight [filter:url(#threshold)_blur(0.6px)] text-rendering-optimizeLegibility antialiased md:h-40 lg:text-[5rem] break-words",
      className,
    )}
  >
    <Texts texts={texts} />
    <SvgFilters />
  </div>
);