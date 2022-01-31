import { BaseSdk } from './base-sdk';

class InternalSdk extends BaseSdk {
  constructor() {
    super(`http://localhost:3000/internal-api`);
  }
}

export const internalSdk = new InternalSdk();
