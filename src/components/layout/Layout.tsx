import Navbar from './Navbar';
import { ReactNode } from 'react';
import styled from 'styled-components';
type layoutProps = {
  children: ReactNode;
};

const Body = styled.main`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  /* Clip animation overflow without creating a second vertical scroll container. */
  overflow-x: clip;
  overflow-y: visible;
  position: relative;
`;

function Layout({ children }: layoutProps) {
  return (
    <div>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <Navbar />
      <Body id="main-content">{children}</Body>
    </div>
  );
}

export default Layout;
