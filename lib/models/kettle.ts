import { IType } from './common';

export interface IKettle {
  id: string;
  name: string;
  sensor_id: string;
  heater_id: String;
}

interface ILogicType extends IType {}
