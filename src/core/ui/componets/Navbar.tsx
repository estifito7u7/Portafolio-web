import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme, DefaultTheme } from "styled-components";
import Constants from "../../../main/data/constants";
import { MenuRounded } from "@mui/icons-material";
import { useLanguage } from "../../../main/I18n/hooks/useLocalization";

interface MobileMenuProps {
  isOpen: boolean;
}

const Nav = styled.div`
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
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  letter-spacing: 1px;
  &::first-letter {
    color:${({ theme }: { theme: DefaultTheme }) => theme.primary};
    font-size: 19px;
  }
`;

const NavItems = styled.ul`
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
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
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
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul<MobileMenuProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar: React.FC = () => {
  const { bio } = Constants();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();
  const { t } = useLanguage();
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Estifito</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">{t("nav.about")}</NavLink>
          <NavLink href="#Skills">{t("nav.skills")}</NavLink>
          <NavLink href="#Experience">{t("nav.experience")}</NavLink>
          <NavLink href="#Projects">{t("nav.projects")}</NavLink>
          <NavLink href="#Education">{t("nav.education")}</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(false)} href="#About">
            {t("nav.about")}
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} href="#Skills">
            {t("nav.skills")}
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} href="#Experience">
            {t("nav.experience")}
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} href="#Projects">
            {t("nav.projects")}
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} href="#Education">
            {t("nav.education")}
            </NavLink>
            <GithubButton
              href={bio.github}
              target="_blank"
              style={{ background: theme.primary, color: theme.text_primary }}
            >
             {t("nav.github_profile")}
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          
          <GithubButton href={bio.github} target="_blank">
          {t("nav.github_profile")}
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
