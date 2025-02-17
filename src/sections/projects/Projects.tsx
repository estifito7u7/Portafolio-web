import { useEffect, useState } from "react";
import styled from "styled-components";
import Constants from "../../main/data/constants"
import ProjectCard from "./components/ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; 
import { EffectCoverflow } from 'swiper/modules';
import { useLanguage } from "../../main/I18n/hooks/useLocalization";
import { ProjectModel } from "./models/ProjectModel";
import Http from "../../core/api/Http";

interface ToggleButtonProps {
  active: boolean;
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px; 
  padding: 0 16px;
  position: relative;
  z-index: 1;
  align-items: center;
  min-height: 600px; 

 
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

 
`;

const Title = styled.div`
  font-size: 3.25rem; 
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 2rem; 
  }
`;

const Desc = styled.div`
  font-size: 1.125rem; 
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 1rem; 
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 1rem; 
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  @media (max-width: 768px) {
    font-size: 0.75rem; 
  }
`;

const ToggleButton = styled.div<ToggleButtonProps>`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  ${({ active, theme }) =>
    active &&
    `
  background:  ${theme.primary + 20};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  width: 100%;
  height: 800px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  @media (max-width: 768px) {
    height: 700px; 
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  box-shadow: none !important; 
  display: flex; 
  justify-content: center; 
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const { t } = useLanguage();

  const callApiProjects = async () => {
    try {
      const res = await Http.get("projects/");
      setProjects(res.data)
      console.log(res.data)
    } catch (error: any) {
      console.error("Error al llamar a la API:", error.response || error.message || error);
    }
  };

useEffect(() => {
  callApiProjects();
}, [])

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>{t("projects.title")}</Title>
        <Desc style={{ marginBottom: "40px" }}>
         {t("projects.subtitle")}
        </Desc>

        <ToggleButtonGroup data-aos="fade-up">
          <ToggleButton
            active={toggle === "all"}
            onClick={() => setToggle("all")}
          >
            Todos
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "web app"}
            onClick={() => setToggle("web app")}
          >
           React
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "android app"}
            onClick={() => setToggle("android app")}
          >
           VUe
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "machine learning"}
            onClick={() => setToggle("machine learning")}
          >
            Django
          </ToggleButton>
        </ToggleButtonGroup>

        <CardContainer data-aos="flip-up">
          <Swiper
            effect={'coverflow'}
            modules={[EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1} 
            breakpoints={{
              640: {
                slidesPerView: 2, 
              },
              768: {
                slidesPerView: 2, 
              },
              1024: {
                slidesPerView: 3, 
              },
            }}
          >
            {/* {(toggle === "all"
              ? projects
              : projects.filter((item) => item.category === toggle)
            ).map((project:ProjectModel) => (
              <StyledSwiperSlide key={project.id} > 
                <ProjectCard project={project} />
              </StyledSwiperSlide>
            ))}
 */}


{(toggle === "all"
              ? projects
              : projects
            ).map((project:ProjectModel) => (
              <StyledSwiperSlide key={project.id} > 
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