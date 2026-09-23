import styled from 'styled-components';
import { BuildRounded, CodeRounded, DevicesRounded } from '@mui/icons-material';
import { useLanguage } from '../../hooks/useLocalization';
import {
  Section as Container,
  SectionContent as Wrapper,
  SectionDescription as Desc,
  SectionTitle as Title,
} from '../../styles/sectionStyles';

const ServiceGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.article`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 210px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(17, 25, 40, 0.78)),
    rgba(17, 25, 40, 0.85);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 170px;
    height: 170px;
    top: -92px;
    right: -70px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary + '28'};
    filter: blur(12px);
    transition:
      transform 0.4s ease,
      background 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${({ theme }) => theme.primary + 'a6'};
    box-shadow: 0 20px 42px ${({ theme }) => theme.primary + '2e'};
  }

  &:hover::before {
    transform: scale(1.35);
    background: ${({ theme }) => theme.primary + '45'};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const IconWrap = styled.div`
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
  border: 1px solid ${({ theme }) => theme.primary + '52'};
  border-radius: 14px;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + '20'};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 8px 18px ${({ theme }) => theme.primary + '1f'};
  transition:
    transform 0.3s ease,
    background 0.3s ease;

  svg {
    font-size: 1.55rem;
  }

  ${ServiceCard}:hover & {
    transform: rotate(-7deg) scale(1.1);
    background: ${({ theme }) => theme.primary + '32'};
  }
`;

const ServiceTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.25rem;
  margin-bottom: 12px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const ServiceText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
`;

const Services = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: <DevicesRounded />,
      title: t('services.web_title'),
      description: t('services.web_desc'),
    },
    {
      icon: <CodeRounded />,
      title: t('services.frontend_title'),
      description: t('services.frontend_desc'),
    },
    {
      icon: <BuildRounded />,
      title: t('services.backend_title'),
      description: t('services.backend_desc'),
    },
  ];

  return (
    <Container id="Services">
      <Wrapper>
        <Title>{t('services.title')}</Title>
        <Desc>{t('services.subtitle')}</Desc>
        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceCard key={service.title} data-aos="fade-up" data-aos-delay={index * 120}>
              <IconWrap>{service.icon}</IconWrap>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceText>{service.description}</ServiceText>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </Wrapper>
    </Container>
  );
};

export default Services;
