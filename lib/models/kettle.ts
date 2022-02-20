import { IType } from './common';

export interface IKettle {
  id: string;
  name: string;
  sensor_id: string;
  heater_id: string;
  logicType_id: string;
  config: any;
}

export interface ILogicType extends IType {}
