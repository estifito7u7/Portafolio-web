
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useLanguage } from '../../main/I18n/hooks/useLocalization';

import { Pagination } from 'swiper/modules';
import Constants from '../../main/data/constants';
import { ExperienceModel } from './models/ExperienceModel';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }

`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12);
  overflow: hidden;
  font-family: Arial, sans-serif;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
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
  font-size: .9em;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-top: 8px;

  @media (max-width: 768px) {
    
    font-size: .8em;
  }
`;

const Experience = () => {
    const { t } = useLanguage();
    const { experiences } = Constants();
  return (
    <Container id="Experience">
      <Wrapper>
        <Title>{t("experience.title")}</Title>
        <Desc style={{ marginBottom: "40px" }}>
        {t("experience.subtitle")}
        </Desc>

        <CardContainer data-aos="fade-up-right">
         
          <Swiper
         className="my-swiper-experience"
          pagination={true} modules={[Pagination]}
            style={{ height: '100%' }}
          >
{experiences.map((experience:ExperienceModel, index) => (
           
            <SwiperSlide key={index}>
            <CardHeader>
            <Circle color="#ff5f56" />
            <Circle color="#ffbd2e" />
            <Circle color="#27c93f" />
          </CardHeader>

              <CardBody>
                <Image src={experience.img} alt="Placeholder" />
                <Title2>{experience.company}</Title2>
                <Description>{experience.desc}</Description>
                <Date>{experience.date}</Date>
              </CardBody>
            </SwiperSlide>
           
     
          ))}
          </Swiper>
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Experience;