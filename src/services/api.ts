import { getApiClient } from './axios'

export const api = getApiClient()
export const apiServerSide = (ctx: any) => getApiClient(ctx)
