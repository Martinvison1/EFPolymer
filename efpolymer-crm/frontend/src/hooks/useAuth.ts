import { create } from 'zustand'
import { User } from '../types'
import { authService } from '../services/authService'

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password)
      set({ user, isLoading: false })
    } catch (error) {
      set({ user: null, isLoading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      set({ user: null, isLoading: false })
    }
  },

  initialize: async () => {
    try {
      const user = await authService.getCurrentUser()
      set({ user, isLoading: false })
    } catch (error) {
      set({ user: null, isLoading: false })
    }
  },
}))

// Initialize auth on app start
useAuthStore.getState().initialize()