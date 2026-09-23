import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/Themes';
export function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
