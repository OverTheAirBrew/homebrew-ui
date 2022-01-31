"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gateway = void 0;
const base_sdk_1 = require("./base-sdk");
class GatewaySdk extends base_sdk_1.BaseSdk {
    constructor() {
        super('http://localhost:9090/api');
    }
}
exports.gateway = new GatewaySdk();
