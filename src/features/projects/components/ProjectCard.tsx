import styled from 'styled-components';
import { ProjectModel } from '../models/ProjectModel';
import { useLanguage } from '../../../hooks/useLocalization';
import { GitHub, OpenInBrowser } from '@mui/icons-material';
const Card = styled.div`
  width: 330px;
  min-height: 490px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(17, 25, 40, 0.78)),
    rgba(17, 25, 40, 0.85);
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition:
    transform 0.5s ease-in-out,
    box-shadow 0.5s ease-in-out,
    filter 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    z-index: 0;
    width: 150px;
    height: 150px;
    top: -88px;
    right: -66px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary + '22'};
    filter: blur(12px);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${({ theme }) => theme.primary + 'a6'};
    box-shadow: 0 20px 42px ${({ theme }) => theme.primary + '2e'};
    filter: brightness(1.1);
  }

  @media (hover: hover) and (min-width: 769px) {
    &:hover .project-preview {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      transition-delay: 500ms;
    }
  }

  @media (max-width: 1059px) {
    width: 100%;
    min-height: 470px;
    padding: 18px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 12px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;
const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;
const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + '1c'};
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContainerDate = styled.div`
  display: flex;
  gap: 10px;
`;
const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: bold;
  margin-top: 7px;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const CaseStudyItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const CaseStudyLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;
const CaseStudyText = styled.p`
  color: ${({ theme }) => theme.text_secondary + 99};
  font-size: 12px;
  line-height: 1.4;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  text-align: center;
`;
const SocialMediaIcon = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
const ProjectPreview = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(145deg, rgba(9, 9, 23, 0.97), rgba(17, 25, 40, 0.96));
  backdrop-filter: blur(14px);
  opacity: 0;
  transform: translateY(14px);
  pointer-events: none;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
`;
const PreviewEyebrow = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;
const PreviewTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  line-height: 1.15;
`;
const PreviewDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  line-height: 1.45;
`;
const PreviewLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
`;
const PreviewLink = styled.a`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.bg};
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    filter: brightness(1.08);
  }
`;

interface Props {
  project: ProjectModel;
}

const ProjectCard = ({ project }: Props) => {
  const { t } = useLanguage();
  return (
    <Card>
      <Image src={project.photo} alt={project.name} loading="lazy" decoding="async" />
      <Details>
        <Title>{project.name}</Title>
        <ContainerDate>
          <Date>{project.start_date}</Date>
          <Date>-</Date>
          <Date>{project.end_date}</Date>
        </ContainerDate>
        <Description>{project.description}</Description>
      </Details>
      <SocialMediaIcons>
        {project.github_link && (
          <SocialMediaIcon
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('projects.github_aria')}
            title={t('projects.github_aria')}
          >
            <GitHub />
          </SocialMediaIcon>
        )}

        {project.website_link && (
          <SocialMediaIcon href={project.website_link} target="_blank" rel="noopener noreferrer">
            <OpenInBrowser />
          </SocialMediaIcon>
        )}
      </SocialMediaIcons>
      <ProjectPreview className="project-preview">
        <PreviewEyebrow>{t('projects.preview')}</PreviewEyebrow>
        <PreviewTitle>{project.name}</PreviewTitle>
        <PreviewDescription>{project.description}</PreviewDescription>
        <Tags>
          {project.technologies.map((technology) => (
            <Tag key={`preview-${technology}`}>{technology}</Tag>
          ))}
        </Tags>
        <CaseStudyItem>
          <CaseStudyLabel>{t('projects.problem')}</CaseStudyLabel>
          <CaseStudyText>{project.problem}</CaseStudyText>
        </CaseStudyItem>
        <CaseStudyItem>
          <CaseStudyLabel>{t('projects.solution')}</CaseStudyLabel>
          <CaseStudyText>{project.solution}</CaseStudyText>
        </CaseStudyItem>
        <CaseStudyItem>
          <CaseStudyLabel>{t('projects.result')}</CaseStudyLabel>
          <CaseStudyText>{project.result}</CaseStudyText>
        </CaseStudyItem>
        <PreviewLinks>
          {project.github_link && (
            <PreviewLink href={project.github_link} target="_blank" rel="noopener noreferrer">
              <GitHub fontSize="small" />
              {t('projects.code')}
            </PreviewLink>
          )}
          {project.website_link && (
            <PreviewLink href={project.website_link} target="_blank" rel="noopener noreferrer">
              <OpenInBrowser fontSize="small" />
              {t('projects.view_site')}
            </PreviewLink>
          )}
        </PreviewLinks>
      </ProjectPreview>
    </Card>
  );
};

export default ProjectCard;
