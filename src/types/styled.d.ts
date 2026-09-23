import 'styled-components';
import type { darkTheme } from '../styles/Themes';

type PortfolioTheme = typeof darkTheme;
declare module 'styled-components' {
  // Declaration merging extends the library's theme with our typed tokens.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends PortfolioTheme {}
}
