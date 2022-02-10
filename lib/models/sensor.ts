import { IType } from './common';

export interface ISensor {
  id: string;
  name: string;
  type_id: string;
}

export interface ISensorType extends IType {}
