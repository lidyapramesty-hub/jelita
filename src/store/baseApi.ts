import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, getToken } from '@/lib/api'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Accept', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Usaha', 'UsahaStats', 'Auth', 'AdminUsers'],
  endpoints: () => ({}),
})
