import { IType } from './common';

export interface ISensor {
  id: string;
  name: string;
  type_id: string;
  config: any;
}

export interface ISensorType extends IType {}
