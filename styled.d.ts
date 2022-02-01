import { ThemeObject } from '@paljs/theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObject {
    name: 'cosmic' | 'corporate' | 'dark' | 'default';
    dir: 'ltr' | 'rtl';
    sidebarHeaderGap: string;
    gridSize: number;
  }
}
