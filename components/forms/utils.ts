import { TFunction } from 'next-i18next';
import styled from 'styled-components';

export function isRequiredMessage(
  t: TFunction,
  property: string,
  namespace?: string,
): string {
  return t('interpolation.is-required', {
    name: t(property, { ns: namespace }),
  });
}

export const ErrorMessage = styled.div`
  color: red;
  font-size: 10px;
  padding: 0;
`;
