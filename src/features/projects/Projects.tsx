import styled from 'styled-components';
import ProjectCard from './components/ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useLanguage } from '../../hooks/useLocalization';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { useRef } from 'react';
import usePortfolio from '../../hooks/usePortfolio';
import {
  Section as Container,
  SectionContent as Wrapper,
  SectionDescription,
  SectionTitle as Title,
} from '../../styles/sectionStyles';

const Description = styled(SectionDescription)`
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  width: 100%;
  height: 620px;
  padding: 12px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Swiper usa overflow: hidden. Este espacio evita que el desplazamiento y
     la sombra de la tarjeta al hacer hover queden recortados. */
  .swiper {
    width: 100%;
    padding: 16px 0 28px;
    margin: -16px 0 -28px;
  }

  @media (max-width: 768px) {
    height: 580px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  box-shadow: none !important;
  display: flex !important;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Projects = () => {
  const { t } = useLanguage();
  const { projects } = usePortfolio();
  const swiperRef = useRef<SwiperInstance | null>(null);

  const pauseAutoplay = () => swiperRef.current?.autoplay?.pause();
  const resumeAutoplay = () => swiperRef.current?.autoplay?.resume();

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>{t('projects.title')}</Title>
        <Description>{t('projects.subtitle')}</Description>

        <CardContainer data-aos="flip-up">
          <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              1060: { slidesPerView: 3 },
            }}
          >
            {projects.map((project) => (
              <StyledSwiperSlide
                key={project.id}
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
              >
                <ProjectCard project={project} />
              </StyledSwiperSlide>
            ))}
          </Swiper>
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
