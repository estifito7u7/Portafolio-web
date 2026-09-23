import { useEffect, useRef } from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import animationData from '../../assets/Profile.json';

export default function ProfileAnimation() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationData: structuredClone(animationData),
    });
    return () => animation.destroy();
  }, []);
  return (
    <div ref={container} aria-hidden="true" style={{ width: 350, height: 350, maxWidth: '100%' }} />
  );
}
