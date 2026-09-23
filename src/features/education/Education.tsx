import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import usePortfolio from '../../hooks/usePortfolio';
import EducationCard from './components/EducationCard.tsx';
import { lazy } from 'react';
import DeferredSection from '../../components/shared/DeferredSection';
import { VisualBoundary } from '../../components/shared/VisualBoundary';
const EarthCanvas = lazy(() => import('../../components/visuals/Earth'));
import { useLanguage } from '../../hooks/useLocalization';
import { EducationModel } from './models/EducationModel.ts';
import styled from 'styled-components';
import {
  Section as Container,
  SectionContent as Wrapper,
  SectionDescription,
  SectionTitle as Title,
} from '../../styles/sectionStyles';

const Description = styled(SectionDescription)`
  margin-bottom: 40px;
`;

const Education = () => {
  const { t } = useLanguage();
  const { education } = usePortfolio();
  return (
    <Container id="Education">
      <Wrapper>
        <Title>{t('education.title')}</Title>
        <Description>{t('education.subtitle')}</Description>

        <VerticalTimeline>
          {education.map((education: EducationModel, index) => (
            <EducationCard key={`education-${index}`} education={education} />
          ))}
        </VerticalTimeline>
        <VisualBoundary>
          <DeferredSection component={EarthCanvas} minHeight={150} />
        </VisualBoundary>
      </Wrapper>
    </Container>
  );
};

export default Education;
