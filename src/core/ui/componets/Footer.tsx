import Wave from 'react-wavify';
import styled from 'styled-components';
import {
    FacebookRounded,
    Instagram,
    LinkedIn,
  } from "@mui/icons-material";
import { useLanguage } from '../../../main/I18n/hooks/useLocalization';
import Constants from '../../../main/data/constants';

  const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
  background-color: #090917;
`;
const Footerr= styled.div`
width: 100%;
height: 385px;
  overflow: visible;
  position: relative;
`;
const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;
const Logo = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 1px;
  &::first-letter {
      font-size: 19px;
    }
`;
const Nav = styled.ul`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;
const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;
const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
  @media (max-width: 768px) {
    margin-top: -0.4rem;
  }
`;


const Footer = () => {
  const { bio } = Constants();
    const { t } = useLanguage();
  return (
<Footerr>

<Wave fill='#090917'
        paused={false}
        
        style={{ display: 'flex'  , paddingTop:"2rem"}}
        options={{
          height: 10,
          amplitude: 70,
          speed: 0.60,
          points: 3
        }}
  />



 
  <FooterContainer  >
      <FooterWrapper  data-aos="fade-up">
        <Logo>Estifito</Logo>
        <Nav >
          <NavLink href="#About"> {t("nav.about")}</NavLink>
          <NavLink href="#Skills"> {t("nav.skills")}</NavLink>
          <NavLink href="#Experience"> {t("nav.experience")}</NavLink>
          <NavLink href="#Projects">  {t("nav.projects")}</NavLink>
          <NavLink href="#Education">  {t("nav.education")}</NavLink>
        </Nav>
       <SocialMediaIcons>
          <SocialMediaIcon href={bio.facebook} target="display">
            <FacebookRounded />
          </SocialMediaIcon>
          <SocialMediaIcon  href={bio.linkedin} target="display">
            <LinkedIn />
          </SocialMediaIcon>
          <SocialMediaIcon href={bio.insta} target="display">
            <Instagram />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>&copy; {t("contact.copy")}</Copyright>
      </FooterWrapper>
    </FooterContainer>
</Footerr>
 
    
  );
};

export default Footer;