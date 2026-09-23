import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import { EducationModel } from '../models/EducationModel';

interface Props {
  education: EducationModel;
}

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;
const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;
const TimelineIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const School = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  display: -webkit-box;
  max-width: 100%;
`;

const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const EducationCard = ({ education }: Props) => {
  return (
    <VerticalTimelineElement
      icon={<TimelineIcon alt={education?.school} src={education?.img} />}
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(17, 25, 40, 0.88))',
        color: '#fff',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)',
        backgroundColor: 'rgba(17, 25, 40, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '20px',
      }}
      contentArrowStyle={{
        borderRight: '7px solid  rgba(255, 255, 255, 0.3)',
      }}
      date={education?.date}
    >
      <Top>
        <Image src={education?.img} alt="" loading="lazy" decoding="async" />
        <Body>
          <School>{education?.school}</School>
          <Degree>{education?.degree}</Degree>
          <Date>{education?.date}</Date>
        </Body>
      </Top>
      <Description>{education?.desc && <Span>{education.desc}</Span>}</Description>
    </VerticalTimelineElement>
  );
};

export default EducationCard;
