import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: var(--section-space) var(--page-gutter);
  scroll-margin-top: 96px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

export const SectionContent = styled.div`
  width: 100%;
  max-width: var(--content-max-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
`;

export const SectionDescription = styled.p`
  max-width: 680px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: 500;
  line-height: 1.65;
  text-align: center;
`;
