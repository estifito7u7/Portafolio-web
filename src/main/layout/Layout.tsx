

import Navbar from "../../core/ui/componets/Navbar";
import { ReactNode } from "react";
import styled from "styled-components";
type layoutProps = {
	children: ReactNode;
};

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;

  
`;


function Layout({ children }: layoutProps) {
  return (
<div>
  <Navbar />
  <Body>
         {children}
        </Body>
        </div>
  );
}

export default Layout;
