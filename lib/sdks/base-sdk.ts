import fetch from 'isomorphic-unfetch';

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: string;
}

export abstract class BaseSdk {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<{ status: number; data: T; isSuccess: boolean }> {
    return await this.makeRequest(url, { ...options, method: 'GET' });
  }

  public async post(
    url: string,
    options?: RequestOptions,
  ): Promise<{ status: number; data: any; isSuccess: boolean }> {
    return await this.makeRequest(url, { ...options, method: 'POST' });
  }

  public async put(
    url: string,
    options?: RequestOptions,
  ): Promise<{ status: number; data: any; isSuccess: boolean }> {
    return await this.makeRequest(url, { ...options, method: 'PUT' });
  }

  public async delete(
    url: string,
    options?: RequestOptions,
  ): Promise<{ status: number; data: any; isSuccess: boolean }> {
    return await this.makeRequest(url, { ...options, method: 'DELETE' });
  }

  private async makeRequest<T>(
    url: string,
    options: RequestOptions & { method: string },
  ): Promise<{ status: number; data: any; isSuccess: boolean }> {
    this.validateUrl(url);
    const absoluteUrl = this.createAbsoluteUrl(url);
    const response = await fetch(absoluteUrl, options);

    try {
      const validResponse = await this.validateResponse(response);
      return {
        status: response.status,
        data: validResponse,
        isSuccess: validResponse !== null,
      };
    } catch (err) {
      return {
        status: response.status,
        data: { message: err },
        isSuccess: false,
      };
    }
  }

  private async validateResponse(response: fetch.IsomorphicResponse) {
    if (response.ok) {
      return await response.json();
    } else {
      // console.log('ERROR RESPONSE', await response.json());
      return response.json();
    }
  }

  private validateUrl(url: string) {
    if (url.indexOf('http') > -1) throw new Error('Url must be relative');
  }

  private createAbsoluteUrl(url: string) {
    if (url[0] === '/') url = url.substr(1);
    return `${this.baseUrl}/${url}`;
  }
}
