import { E2E_BASE_URL } from '../config/variables';

export const pathToUrl = (path: string) => {
  return `${E2E_BASE_URL}${path}`;
};
