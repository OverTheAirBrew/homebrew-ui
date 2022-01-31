"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalSdk = void 0;
const base_sdk_1 = require("./base-sdk");
class InternalSdk extends base_sdk_1.BaseSdk {
    constructor() {
        super(`http://localhost:3000/internal-api`);
    }
}
exports.internalSdk = new InternalSdk();
