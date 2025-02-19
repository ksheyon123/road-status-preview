import {
  ApiError,
  ApiResponse,
  HttpMethod,
  RequestConfig,
} from "@/types/https";

const DEFAULT_TIMEOUT = 10000; // 10초
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const api = async <T = { data: any }>(
  url: string,
  method: HttpMethod,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  const controller = new AbortController();
  const timeout = config.timeout || DEFAULT_TIMEOUT;
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...DEFAULT_HEADERS,
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data,
        `Request failed with status ${response.status}`
      );
    }

    return {
      data,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new ApiError(408, null, `Request timeout after ${timeout}ms`);
      }
      throw new ApiError(500, null, error.message);
    }

    throw new ApiError(500, null, "An unexpected error occurred");
  }
};

// 편의성을 위한 HTTP 메서드별 함수
export const get = <T = any>(url: string, config?: RequestConfig) =>
  api<T>(url, "GET", config);

export const post = <T = any>(url: string, body: any, config?: RequestConfig) =>
  api<T>(url, "POST", { ...config, body });

export const put = <T = any>(url: string, body: any, config?: RequestConfig) =>
  api<T>(url, "PUT", { ...config, body });

export const del = <T = any>(url: string, config?: RequestConfig) =>
  api<T>(url, "DELETE", config);

export const patch = <T = any>(
  url: string,
  body: any,
  config?: RequestConfig
) => api<T>(url, "PATCH", { ...config, body });
