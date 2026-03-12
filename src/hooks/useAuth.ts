'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAppDispatch from './useAppDispatch'
import useAppSelector from './useAppSelector'
import { setCredentials, setUser, clearCredentials } from '@/store/authSlice'
import { useLoginMutation, useLogoutMutation, useLazyGetMeQuery } from '@/store/services/authApi'
import { getToken, setToken, removeToken } from '@/lib/api'

export default function useAuth() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation()
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()
  const [triggerGetMe, { isLoading: isLoadingUser }] = useLazyGetMeQuery()

  const login = useCallback(
    async (username: string, password: string, role?: 'pegawai' | 'mitra') => {
      const result = await loginMutation({ username, password, role }).unwrap()
      setToken(result.token)
      dispatch(setCredentials({ user: result.user, token: result.token }))
      router.push('/dashboard')
      return result
    },
    [loginMutation, dispatch, router],
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap()
    } catch {
      // ignore logout API errors
    } finally {
      removeToken()
      dispatch(clearCredentials())
      router.push('/login')
    }
  }, [logoutMutation, dispatch, router])

  const checkAuth = useCallback(async () => {
    const token = getToken()
    if (!token) {
      dispatch(clearCredentials())
      return false
    }
    try {
      const userData = await triggerGetMe().unwrap()
      dispatch(setUser(userData))
      return true
    } catch {
      removeToken()
      dispatch(clearCredentials())
      return false
    }
  }, [triggerGetMe, dispatch])

  return {
    user,
    isAuthenticated,
    isLoggingIn,
    isLoggingOut,
    isLoadingUser,
    login,
    logout,
    checkAuth,
  }
}
