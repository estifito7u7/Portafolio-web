import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useLanguage } from '../../hooks/useLocalization';

import { Pagination } from 'swiper/modules';
import usePortfolio from '../../hooks/usePortfolio';
import { ExperienceModel } from './models/ExperienceModel';
import {
  Section as Container,
  SectionContent as Wrapper,
  SectionDescription,
  SectionTitle as Title,
} from '../../styles/sectionStyles';

const SectionSubtitle = styled(SectionDescription)`
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 600px;
  position: relative;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(17, 25, 40, 0.78)),
    rgba(17, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  font-family: Arial, sans-serif;
  margin-top: 12px;

  @media (max-width: 768px) {
    height: 540px;
  }
`;

const ExperienceSwiper = styled(Swiper)`
  height: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: ${({ color }) => color};
`;

const CardBody = styled.div`
  padding: 20px;
  text-align: center;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(27, 31, 35, 0.1);
  margin-bottom: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title2 = styled.h3`
  font-size: 1.5em;
  margin: 10px 0;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 1.1em;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Date = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const Experience = () => {
  const { t } = useLanguage();
  const { experiences } = usePortfolio();
  return (
    <Container id="Experience">
      <Wrapper>
        <Title>{t('experience.title')}</Title>
        <SectionSubtitle>{t('experience.subtitle')}</SectionSubtitle>

        <CardContainer data-aos="fade-up-right">
          <ExperienceSwiper
            className="my-swiper-experience"
            pagination={true}
            modules={[Pagination]}
          >
            {experiences.map((experience: ExperienceModel, index) => (
              <SwiperSlide key={index}>
                <CardHeader>
                  <Circle color="#ff5f56" />
                  <Circle color="#ffbd2e" />
                  <Circle color="#27c93f" />
                </CardHeader>

                <CardBody>
                  <Image
                    src={experience.img}
                    alt={experience.company}
                    loading="lazy"
                    decoding="async"
                  />
                  <Title2>{experience.company}</Title2>
                  <Description>{experience.desc}</Description>
                  <Date>{experience.date}</Date>
                </CardBody>
              </SwiperSlide>
            ))}
          </ExperienceSwiper>
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Experience;
