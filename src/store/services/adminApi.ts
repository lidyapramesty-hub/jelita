import { baseApi } from '../baseApi'

interface UserData {
  id: number
  name: string
  username: string
  role: 'pegawai' | 'mitra' | 'admin'
  created_at: string
  updated_at: string
}

interface PaginatedUsers {
  data: UserData[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface UserListParams {
  search?: string
  role?: string
  per_page?: number
  page?: number
  sort_by?: string
  sort_dir?: string
}

interface CreateUserInput {
  name: string
  username: string
  password: string
  role: 'pegawai' | 'mitra'
}

interface UpdateUserInput {
  name?: string
  username?: string
  password?: string
  role?: 'pegawai' | 'mitra'
}

interface UserMutationResponse {
  message: string
  data: UserData
}

interface DeleteResponse {
  message: string
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<PaginatedUsers, UserListParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams()
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              searchParams.append(key, String(value))
            }
          })
        }
        const qs = searchParams.toString()
        return `/admin/users${qs ? `?${qs}` : ''}`
      },
      providesTags: ['AdminUsers'],
    }),
    createAdminUser: builder.mutation<UserMutationResponse, CreateUserInput>({
      query: (body) => ({
        url: '/admin/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AdminUsers'],
    }),
    updateAdminUser: builder.mutation<UserMutationResponse, { id: number; data: UpdateUserInput }>({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['AdminUsers'],
    }),
    deleteAdminUser: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminUsers'],
    }),
  }),
})

export const {
  useGetAdminUsersQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
} = adminApi
