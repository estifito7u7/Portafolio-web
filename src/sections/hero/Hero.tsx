import styled from "styled-components";
import Constants from "../../main/data/constants"
import Typewriter from "typewriter-effect";
import Profiele from "../../core/canvas/Profile.json";
import { Tilt } from "react-tilt";
import HeroBgAnimation from "./components/HeroBgAnimation";
import StarCanvas from "../../core/canvas/Stars";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLanguage } from "../../main/I18n/hooks/useLocalization";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;
const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;


  @media (max-width: 640px) {
    text-align: center;
  }
  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: #4fbfc2;
  
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const ResumeButton = styled.button`
  padding: 10px 30px;
  font-weight: 500;
  background: transparent;
  outline: none !important;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  border: 2px solid #4fbfc2;
  z-index: 1;
  color: ${({ theme }) => theme.text_primary};
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    z-index: -1;
    background: #4fbfc2;
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }

  &:hover:after {
    top: auto;

    bottom: 0;

    height: 100%;
  }
  @media (max-width: 640px) {
  
    font-size: 18px;
  }
  color: white;
`;


const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const Hero = () => {
    const { t } = useLanguage();
    const { bio } = Constants();
  return (
    <div id="About">
      <HeroContainer> 
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <div data-aos="fade-left">
          <HeroInnerContainer>
            <HeroLeftContainer>
              <div >
                <Title>
                {t("hero.title")}<br /> {bio.name}
                </Title>
                <TextLoop>
                {t("hero.subtitle")}
                  <Span>
                    <Typewriter
                      options={{
                        strings: bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </div>

              <div>
                <SubTitle>{bio.description}</SubTitle>
              </div>

              <ResumeButton onClick={() => window.open(bio.resume, '_blank')}  data-aos="fade-up-right">
              {t("hero.download_cv")}
              </ResumeButton>
            </HeroLeftContainer>
            <HeroRightContainer>
              <div  data-aos="fade-up-left">
                <Tilt>
                  <Player
                    autoplay
                    loop
                    src={Profiele}
                    style={{ height: "350px", width: "350px" }}
                  />
                </Tilt>
              </div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
