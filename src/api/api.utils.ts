import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuth } from 'src/state/auth.state'
import { AxiosError } from 'axios'
import { merge } from 'lodash-es'

export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError === true
}

/**
 * Creates a axios instance for comunicating with the api, containing
 * the api baseUrl and automaticaly sending the Authorization header
 * with the currently logged user bearer token
 */
export function api(options?: AxiosRequestConfig): AxiosInstance {
  const { state: authState } = useAuth()
  const { apiToken, organizationId = 2 } = authState

  const headers: Record<string, string | number> = {
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
  }

  if (apiToken) headers.Authorization = `Bearer ${apiToken}`
  if (organizationId) headers.organizationid = organizationId

  const defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.API_BASE_URL,
    headers,
  }

  const axiosOptions = merge(defaultOptions, options)

  return axios.create(axiosOptions)
}
