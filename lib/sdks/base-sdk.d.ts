export interface RequestOptions {
    headers?: Record<string, string>;
    body?: string;
}
export declare abstract class BaseSdk {
    private baseUrl;
    constructor(baseUrl: string);
    get<T>(url: string, options?: RequestOptions): Promise<{
        status: number;
        data: T;
        isSuccess: boolean;
    }>;
    post(url: string, options?: RequestOptions): Promise<{
        status: number;
        data: any;
        isSuccess: boolean;
    }>;
    put(url: string, options?: RequestOptions): Promise<{
        status: number;
        data: any;
        isSuccess: boolean;
    }>;
    delete(url: string, options?: RequestOptions): Promise<{
        status: number;
        data: any;
        isSuccess: boolean;
    }>;
    private makeRequest;
    private validateResponse;
    private validateUrl;
    private createAbsoluteUrl;
}
