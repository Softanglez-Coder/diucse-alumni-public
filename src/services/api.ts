import { env, buildApiUrl, debugLog, isDevelopment } from '../config/env';

/**
 * API service for making HTTP requests
 */
class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.API_BASE_URL;
    debugLog('ApiService initialized with base URL:', this.baseUrl);
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = buildApiUrl(endpoint);
    debugLog('Making GET request to:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      debugLog('GET response:', data);
      return data;
    } catch (error) {
      debugLog('GET error:', error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = buildApiUrl(endpoint);
    debugLog('Making POST request to:', url, 'with data:', data);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      debugLog('POST response:', responseData);
      return responseData;
    } catch (error) {
      debugLog('POST error:', error);
      throw error;
    }
  }

  async find<T>(endpoint: string, query: Record<string, any>): Promise<T> {
    const url = new URL(buildApiUrl(endpoint));
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    debugLog('Making SEARCH request to:', url.toString());

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      debugLog('SEARCH response:', data);
      return data;
    } catch (error) {
      debugLog('SEARCH error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();

// Example usage hooks
export const useApiConfig = () => {
  return {
    baseUrl: env.API_BASE_URL,
    isDev: isDevelopment(),
    debugMode: env.DEBUG_MODE,
  };
};
