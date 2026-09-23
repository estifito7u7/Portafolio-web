import { ComponentType, LazyExoticComponent, Suspense, useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  component: LazyExoticComponent<ComponentType>;
  minHeight: number;
}

/** Loads optional graphics near the viewport. Never use for indexable text. */
const DeferredSection = ({ component: Component, minHeight }: DeferredSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '400px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender && (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      )}
    </div>
  );
};

export default DeferredSection;
