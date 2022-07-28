import { isMobile, isTablet } from 'react-device-detect';

export function isDesktop() {
  if (isMobile) return false;
  if (isTablet) return false;
  return true;
}
