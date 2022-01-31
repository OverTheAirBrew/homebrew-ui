import { BaseSdk } from './base-sdk';

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

class GatewaySdk extends BaseSdk {
  constructor() {
    super('http://localhost:9090/api');
  }
}

export const gateway = new GatewaySdk();
