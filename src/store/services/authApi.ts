import { baseApi } from '../baseApi'
import type { AuthUser } from '../authSlice'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  user: AuthUser
  token: string
}

interface LogoutResponse {
  message: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getMe: builder.query<AuthUser, void>({
      query: () => '/me',
      providesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useGetMeQuery, useLazyGetMeQuery } = authApi
