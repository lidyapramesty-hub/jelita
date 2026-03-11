import { baseApi } from '../baseApi'
import type { Usaha, StatsData, Platform } from '@/types/usaha'

interface UsahaListResponse {
  data: Usaha[]
  total: number
  current_page: number
  last_page: number
  per_page: number
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
  page?: number
  per_page?: number
}

export interface UsahaCreateInput {
  nama_pemilik: string
  nama_usaha: string
  deskripsi_kegiatan?: string
  kbli_kategori_kode?: string
  kbli_kelompok_kode?: string
  provinsi_kode?: string
  provinsi_nama?: string
  kabkot_kode?: string
  kabkot_nama?: string
  kecamatan_kode?: string
  kecamatan_nama?: string
  desa_kode?: string
  desa_nama?: string
  sls_kode?: string
  sls_nama?: string
  sub_sls?: string
  latitude?: number | null
  longitude?: number | null
  platforms?: Pick<Platform, 'platform' | 'nama_akun'>[]
  kelas_usaha?: string
  cakupan_pasar?: string
}

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
