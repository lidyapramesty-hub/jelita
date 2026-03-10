import { baseApi } from '../baseApi'
import type { Usaha, StatsData } from '@/types/usaha'

interface UsahaListResponse {
  data: Usaha[]
  total: number
}

interface UsahaDetailResponse {
  data: Usaha
}

interface UsahaMutationResponse {
  message: string
  data: Usaha
}

interface DeleteResponse {
  message: string
}

interface UsahaListParams {
  search?: string
  kelas_usaha?: string
  cakupan_pasar?: string
  kecamatan_nama?: string
  kbli_kategori_kode?: string
  sort_by?: string
  sort_dir?: string
}

export type UsahaCreateInput = Omit<Usaha, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'created_by_email' | 'updated_by_email' | 'is_active'>

export const usahaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsahaList: builder.query<UsahaListResponse, UsahaListParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams()
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value) searchParams.append(key, value)
          })
        }
        const qs = searchParams.toString()
        return `/usaha${qs ? `?${qs}` : ''}`
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Usaha' as const, id })),
              { type: 'Usaha', id: 'LIST' },
            ]
          : [{ type: 'Usaha', id: 'LIST' }],
    }),
    getUsahaById: builder.query<UsahaDetailResponse, string>({
      query: (id) => `/usaha/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Usaha', id }],
    }),
    getUsahaStats: builder.query<StatsData, void>({
      query: () => '/usaha/stats',
      providesTags: ['UsahaStats'],
    }),
    createUsaha: builder.mutation<UsahaMutationResponse, UsahaCreateInput>({
      query: (body) => ({
        url: '/usaha',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Usaha', id: 'LIST' }, 'UsahaStats'],
    }),
    updateUsaha: builder.mutation<UsahaMutationResponse, { id: string; data: Partial<UsahaCreateInput> }>({
      query: ({ id, data }) => ({
        url: `/usaha/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Usaha', id },
        { type: 'Usaha', id: 'LIST' },
        'UsahaStats',
      ],
    }),
    deleteUsaha: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `/usaha/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Usaha', id: 'LIST' }, 'UsahaStats'],
    }),
  }),
})

export const {
  useGetUsahaListQuery,
  useGetUsahaByIdQuery,
  useGetUsahaStatsQuery,
  useCreateUsahaMutation,
  useUpdateUsahaMutation,
  useDeleteUsahaMutation,
} = usahaApi
