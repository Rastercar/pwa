/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AxiosRequestConfig,
  CancelTokenSource,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from 'axios'

import { ref, Ref, shallowRef } from 'vue'
import axios from 'axios'
import { api } from 'src/api/api.utils'

export interface useApiReturn<T> {
  /**
   * Axios Response
   */
  response: Ref<AxiosResponse<T> | undefined>

  /**
   * Axios response data
   */
  data: Ref<T | undefined>

  /**
   * Indicates if the request has finished
   */
  isFinished: Ref<boolean>

  /**
   * Indicates if the request is currently loading
   */
  isLoading: Ref<boolean>

  /**
   * Indicates if the request was canceled
   */
  aborted: Ref<boolean>

  /**
   * Any errors that may have occurred
   */
  error: Ref<AxiosError<T> | undefined>

  /**
   * Aborts the current request
   */
  abort: (message?: string | undefined) => void

  /**
   * Manually call the axios request
   */
  execute: (config?: AxiosRequestConfig) => void
}

export interface UseAxiosOptions {
  /**
   * Will automatically run axios request when `useAxios` is used
   *
   * @default true
   */
  immediate?: boolean
}

export function useAxios<T = any>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions): useApiReturn<T> // prettier-ignore
export function useAxios<T = any>(url: string, instance?: AxiosInstance, options?: UseAxiosOptions): useApiReturn<T> // prettier-ignore
export function useAxios<T = any>(url: string, config: AxiosRequestConfig, instance: AxiosInstance, options?: UseAxiosOptions): useApiReturn<T> // prettier-ignore

export function useAxios<T = any>(url: string, ...args: any[]) {
  let defaultConfig: AxiosRequestConfig = {}
  let instance: AxiosInstance = api()
  let options: UseAxiosOptions = { immediate: true }

  if (args.length > 0) {
    /**
     * Unable to use `instanceof` here becuase of (https://github.com/axios/axios/issues/737)
     * so instead we are checking if there is a `request` on the object to see if it is an
     * axios instance
     */
    if ('request' in args[0]) instance = args[0]
    else defaultConfig = args[0]
  }

  if (args.length > 1) {
    if ('request' in args[1]) instance = args[1]
  }

  if (args.length >= 2) options = args[args.length - 1]

  const response = shallowRef<AxiosResponse<T>>()
  const error = shallowRef<AxiosError<T>>()
  const data = shallowRef<T>()

  const isFinished = ref(false)
  const isLoading = ref(false)
  const aborted = ref(false)

  const cancelToken: CancelTokenSource = axios.CancelToken.source()

  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return

    cancelToken.cancel(message)
    aborted.value = true
    isLoading.value = false
    isFinished.value = false
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }

  const execute = (config: AxiosRequestConfig = {}) => {
    setLoading(true)

    instance(url, {
      ...defaultConfig,
      ...config,
      cancelToken: cancelToken.token,
    })
      .then((r: any) => {
        response.value = r
        data.value = r.data
      })
      .catch((e: AxiosError) => {
        error.value = e
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (options.immediate) execute()

  return {
    data,
    error,
    abort,
    aborted,
    execute,
    response,
    isLoading,
    isFinished,
    cancel: abort,
    canceled: aborted,
    loading: isLoading,
    finished: isFinished,
  }
}
