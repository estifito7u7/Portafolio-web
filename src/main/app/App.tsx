
import './css/App.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Hero from '../../sections/hero/Hero'
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from '../../core/theme/Themes';
import StartCanvas from "../../core/canvas/Stars";
import Skills from '../../sections/skills/Skills';
import Experience from '../../sections/experience/Experience';
import Projects from '../../sections/projects/Projects';
import Education from '../../sections/education/Education';
import Contact from '../../sections/contact/Contact';
import Footer from '../../core/ui/componets/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { LanguageProvider } from '../I18n/hooks/useLocalization'; 



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


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,  
      once: false,
            
    });
  }, []);

  return (
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
  )
}

export default App
