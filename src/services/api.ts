/**
 * API Service Configuration
 * 
 * This file contains the base API configuration and common request methods.
 * Customize the BASE_URL and add authentication headers as needed.
 */

import type { ApiResponse } from '@types'

const DEFAULT_BASE_URL = import.meta.env.VITE_API_URL || '/api'

interface RequestConfig extends RequestInit {
  params?: Record<string, string>
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...requestConfig } = config
    
    let url = `${this.baseUrl}${endpoint}`
    
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    const response = await fetch(url, {
      ...requestConfig,
      headers: {
        ...defaultHeaders,
        ...requestConfig.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred')
    }

    return {
      data,
      status: response.status,
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const createApi = (baseUrl: string = DEFAULT_BASE_URL) => new ApiService(baseUrl)

export const api = createApi()

export default api
