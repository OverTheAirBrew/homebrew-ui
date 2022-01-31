import { BaseSdk } from './base-sdk';
export declare type Record<K extends keyof any, T> = {
    [P in K]: T;
};
declare class GatewaySdk extends BaseSdk {
    constructor();
}
export declare const gateway: GatewaySdk;
export {};
