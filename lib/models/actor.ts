import { IType } from './common';

export interface IActor {
  id: string;
  name: string;
  type_id: string;
}

export interface IActorType extends IType {}
