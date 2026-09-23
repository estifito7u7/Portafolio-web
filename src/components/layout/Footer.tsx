import Wave from 'react-wavify';
import styled from 'styled-components';
import { FacebookRounded, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';
import { useLanguage } from '../../hooks/useLocalization';
import usePortfolio from '../../hooks/usePortfolio';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
  background-color: #090917;
`;
const Footerr = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
`;
const FooterWrapper = styled.div`
  width: 100%;
  max-width: var(--content-max-width);
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem var(--page-gutter);
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
const Nav = styled.nav`
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
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  @media (max-width: 768px) {
    margin-top: -0.4rem;
  }
`;

const WhatsAppButton = styled.a`
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #25d366;
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.42);
  z-index: 20;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #ffffff;
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 12px 26px rgba(37, 211, 102, 0.56);
  }

  @media (max-width: 768px) {
    right: 12px;
    bottom: max(8px, env(safe-area-inset-bottom));
    width: 52px;
    height: 52px;
    border: 3px solid #090917;
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.36);
  }
`;

const Footer = () => {
  const { bio } = usePortfolio();
  const { t } = useLanguage();
  return (
    <Footerr>
      <Wave
        fill="#090917"
        paused={false}
        style={{ display: 'flex', paddingTop: '2rem' }}
        options={{
          height: 10,
          amplitude: 70,
          speed: 0.6,
          points: 3,
        }}
      />

      <FooterContainer>
        <FooterWrapper data-aos="fade-up">
          <Logo>Estifito</Logo>
          <Nav>
            <NavLink href="#About"> {t('nav.about')}</NavLink>
            <NavLink href="#Skills"> {t('nav.skills')}</NavLink>
            <NavLink href="#Services"> {t('nav.services')}</NavLink>
            <NavLink href="#Experience"> {t('nav.experience')}</NavLink>
            <NavLink href="#Projects"> {t('nav.projects')}</NavLink>
            <NavLink href="#Education"> {t('nav.education')}</NavLink>
          </Nav>
          <SocialMediaIcons>
            <SocialMediaIcon
              aria-label="Facebook"
              href={bio.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookRounded />
            </SocialMediaIcon>
            <SocialMediaIcon
              aria-label="LinkedIn"
              href={bio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </SocialMediaIcon>
            <SocialMediaIcon
              aria-label="Instagram"
              href={bio.insta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </SocialMediaIcon>
          </SocialMediaIcons>
          <Copyright>&copy; {t('contact.copy')}</Copyright>
        </FooterWrapper>
      </FooterContainer>
      <WhatsAppButton
        href={`https://wa.me/50661258820?text=${encodeURIComponent(t('ui.whatsapp_message'))}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('ui.whatsapp_contact')}
        title={t('ui.whatsapp_contact')}
      >
        <WhatsApp fontSize="large" />
      </WhatsAppButton>
    </Footerr>
  );
};

export default Footer;
