import React, { useState } from 'react';

import styled, { useTheme, DefaultTheme } from 'styled-components';
import usePortfolio from '../../hooks/usePortfolio';
import { CloseRounded, GitHub, MenuRounded } from '@mui/icons-material';
import { useLanguage } from '../../hooks/useLocalization';

const Nav = styled.nav`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;

  @media screen and (max-width: 768px) {
    height: 72px;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;

  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 0 20px;
  }
`;
const NavLogo = styled.a`
  width: 80%;
  padding: 0 6px;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  letter-spacing: 1px;

  @media screen and (max-width: 768px) {
    width: auto;
    flex: 1;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: auto;
    flex: 0 0 auto;
    font-size: 16px;
  }
`;

const NavItems = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    gap: 16px;
    padding: 0 16px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: auto;
    flex: 0 0 auto;
    padding: 0;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text_primary};
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    min-height: 44px;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 13px;
    white-space: nowrap;
  }
`;

const MobileIcon = styled.button`
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text_primary};
  display: none;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.card_light};
    color: ${({ theme }) => theme.primary};
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  padding: 16px var(--page-gutter) 24px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 72px;
  left: 0;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + '22'};
  border-radius: 0 0 16px 16px;
  box-shadow: 0 14px 24px rgba(0, 0, 0, 0.28);
  z-index: 1000;
`;

const MobileNavLink = styled(NavLink)`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.card_light};
  }
`;

const Navbar: React.FC = () => {
  const { bio } = usePortfolio();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();
  const { t } = useLanguage();
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo href="/">Estifito</NavLogo>

        <MobileIcon
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t('ui.close_menu') : t('ui.open_menu')}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <CloseRounded /> : <MenuRounded />}
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">{t('nav.about')}</NavLink>
          <NavLink href="#Skills">{t('nav.skills')}</NavLink>
          <NavLink href="#Services">{t('nav.services')}</NavLink>
          <NavLink href="#Experience">{t('nav.experience')}</NavLink>
          <NavLink href="#Projects">{t('nav.projects')}</NavLink>
          <NavLink href="#Education">{t('nav.education')}</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu id="mobile-navigation">
            <MobileNavLink onClick={() => setIsOpen(false)} href="#About">
              {t('nav.about')}
            </MobileNavLink>
            <MobileNavLink onClick={() => setIsOpen(false)} href="#Skills">
              {t('nav.skills')}
            </MobileNavLink>
            <MobileNavLink onClick={() => setIsOpen(false)} href="#Services">
              {t('nav.services')}
            </MobileNavLink>
            <MobileNavLink onClick={() => setIsOpen(false)} href="#Experience">
              {t('nav.experience')}
            </MobileNavLink>
            <MobileNavLink onClick={() => setIsOpen(false)} href="#Projects">
              {t('nav.projects')}
            </MobileNavLink>
            <MobileNavLink onClick={() => setIsOpen(false)} href="#Education">
              {t('nav.education')}
            </MobileNavLink>
            <GithubButton
              href={bio.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: theme.primary, color: theme.text_primary }}
            >
              <GitHub fontSize="small" />
              {t('nav.github_profile')}
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton href={bio.github} target="_blank" rel="noopener noreferrer">
            <GitHub fontSize="small" />
            {t('nav.github_profile')}
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
