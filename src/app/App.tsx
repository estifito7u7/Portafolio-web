import '../styles/App.css';
import styled from 'styled-components';
import { lazy, Suspense, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { VisualBoundary } from '../components/shared/VisualBoundary';
import Layout from '../components/layout/Layout';
import Hero from '../features/hero/Hero';
import Skills from '../features/skills/Skills';
import Services from '../features/services/Services';
import Experience from '../features/experience/Experience';
import Projects from '../features/projects/Projects';
import Education from '../features/education/Education';
import Contact from '../features/contact/Contact';
import Footer from '../components/layout/Footer';
const Stars = lazy(() => import('../components/visuals/Stars'));
const Wrapper = styled.div`
  padding-bottom: 100px;
  background:
    linear-gradient(38.73deg, rgba(0, 204, 204, 0.15) 0%, rgba(201, 32, 184, 0) 50%),
    linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;
const ClosingWrapper = styled(Wrapper)`
  padding-bottom: 0;
  clip-path: none;
`;
export default function App() {
  useEffect(() => {
    document.getElementById('root')?.removeAttribute('data-prerendered');
    document.getElementById('prerender-styles')?.remove();
    // createRoot replaces the static snapshot. Restore deep anchors afterwards.
    const anchor = document.getElementById(window.location.hash.slice(1));
    if (anchor) requestAnimationFrame(() => anchor.scrollIntoView());
    AOS.init({
      duration: 1000,
      once: true,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);
  return (
    <Layout>
      <div>
        <VisualBoundary>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </VisualBoundary>
        <Hero />
        <Wrapper>
          <Skills />
          <Experience />
        </Wrapper>
        <Services />
        <Projects />
        <ClosingWrapper>
          <Education />
          <Contact />
          <Footer />
        </ClosingWrapper>
      </div>
    </Layout>
  );
}
