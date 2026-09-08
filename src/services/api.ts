import { isAxiosError } from "axios"
import type { AxiosRequestConfig } from "axios"

import type {
  GlobalErrorResponse,
  GlobalSuccessResponse,
} from "@/types/response"
import { api } from "@/lib/axios"

class ApiServiceClass {
  handleError(error: unknown) {
    if (isAxiosError<GlobalErrorResponse>(error)) {
      return new Error(error.response?.data.message || error.message)
    } else if (error instanceof Error) {
      return new Error(error.message)
    }
  }

  async get<T, TIsArray extends boolean = false>({
    url,
    config,
  }: {
    url: string
    config?: AxiosRequestConfig
  }) {
    try {
      const response = await api.get<GlobalSuccessResponse<T, TIsArray>>(
        url,
        config,
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<TResponse, TIsArray extends boolean = false, TPayload = unknown>({
    url,
    payload,
    config,
  }: {
    url: string
    payload?: TPayload
    config?: AxiosRequestConfig
  }) {
    try {
      const response = await api.post<
        GlobalSuccessResponse<TResponse, TIsArray>
      >(url, payload, config)

      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<TResponse, TIsArray extends boolean = false, TPayload = unknown>({
    url,
    payload,
    config,
  }: {
    url: string
    payload?: TPayload
    config?: AxiosRequestConfig
  }) {
    try {
      const response = await api.put<
        GlobalSuccessResponse<TResponse, TIsArray>
      >(url, payload, config)

      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async patch<TResponse, TPayload = unknown>({
    url,
    payload,
    config,
  }: {
    url: string
    payload?: TPayload
    config?: AxiosRequestConfig
  }) {
    try {
      const response = await api.patch<GlobalSuccessResponse<TResponse>>(
        url,
        payload,
        config,
      )

      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<TResponse, TIsArray extends boolean = false>({
    url,
    config,
  }: {
    url: string
    config?: AxiosRequestConfig
  }) {
    try {
      const response = await api.delete<
        GlobalSuccessResponse<TResponse, TIsArray>
      >(url, config)

      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

export const ApiService = new ApiServiceClass()
