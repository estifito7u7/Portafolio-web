import styled from 'styled-components';
import { Tilt } from 'react-tilt';
import usePortfolio from '../../hooks/usePortfolio';
import { useLanguage } from '../../hooks/useLocalization';
import {
  Section as Container,
  SectionContent as Wrapper,
  SectionDescription,
  SectionTitle as Title,
} from '../../styles/sectionStyles';

const Description = styled(SectionDescription)`
  margin-bottom: 40px;
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;

  @media (max-width: 1059px) {
    > div {
      width: 100%;
    }
  }
`;

const Skill = styled.div`
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 500px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(17, 25, 40, 0.78)),
    rgba(17, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  border-radius: 20px;
  padding: 18px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 180px;
    height: 180px;
    top: -100px;
    right: -72px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary + '25'};
    filter: blur(14px);
  }

  @media (max-width: 1059px) {
    width: 100%;
    max-width: none;
    padding: 10px 36px;
  }

  @media (max-width: 500px) {
    width: 100%;
    max-width: none;
    padding: 10px 36px;
  }
`;

const SkillTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;
const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;
const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Skills = () => {
  const { t } = useLanguage();
  const { skills } = usePortfolio();
  return (
    <Container id="Skills">
      <Wrapper>
        <Title>{t('skills.title')}</Title>
        <Description>{t('skills.subtitle')}</Description>

        <SkillsContainer>
          {skills.map((skill) => (
            <Tilt key={`skill-group-${skill.title}`}>
              <Skill key={`skill-group-${skill.title}`} data-aos="flip-up">
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillList>
                  {skill.skills.map((item) => (
                    <SkillItem key={`skill-${item.name}`}>
                      <SkillImage src={item.image} alt="" loading="lazy" decoding="async" />
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Skill>
            </Tilt>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
