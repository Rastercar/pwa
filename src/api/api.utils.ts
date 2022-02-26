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
  const { apiToken } = authState

  const defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: apiToken ? `Bearer ${apiToken}` : null,
    },
  }

  const axiosOptions = merge(defaultOptions, options)

  return axios.create(axiosOptions)
}
