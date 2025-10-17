
import './css/App.css'
import { BrowserRouter } from 'react-router-dom'
import styled, {  ThemeProvider } from "styled-components";
import { darkTheme } from '../../core/theme/Themes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from '../I18n/hooks/useLocalization'; 
import  { Suspense, lazy, useEffect } from 'react';
import { LoadingProvider , useLoading } from '../layout/context/LayaoutContext';
import Loading from '../../core/ui/componets/LoadingComponent';


const Layout = lazy(() => import('../layout/Layout'));
const StartCanvas = lazy(() => import('../../core/canvas/Stars'));
const Hero = lazy(() => import('../../sections/hero/Hero'));
const Skills = lazy(() => import('./../../sections/skills/Skills'));
const Experience = lazy(() => import('./../../sections/experience/Experience'));
const Projects = lazy(() => import('../../sections/projects/Projects'));
const Education = lazy(() => import('../../sections/education/Education'));
const Contact = lazy(() => import('../../sections/contact/Contact'));
const Footer = lazy(() => import('../../core/ui/componets/Footer'));

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,  
      once: false,
            
    });
  }, []);


const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(0, 204, 204, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;


const AppContent = () => {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const loadResources = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      setIsLoading(false); 
    };

    loadResources();
  }, [setIsLoading]);

  return (
    <Suspense fallback={<Loading />}>
      <>
    <ThemeProvider theme={darkTheme}>
      <LanguageProvider>
     <BrowserRouter>
     <Layout>
     
      <StartCanvas />
      <div>
        <Hero/>
        <Wrapper>
        <Skills/>
        <Experience/>
        </Wrapper>
        <Projects/>

        <Wrapper>
              <Education />
              <Contact />
              <Footer/> 
            </Wrapper>
      </div>
     </Layout>
     </BrowserRouter>
     </LanguageProvider>
     </ThemeProvider>
    </>
    </Suspense>
  );
};



  return (
    <LoadingProvider>
    <AppContent />
  </LoadingProvider>
  )
}

export default App
