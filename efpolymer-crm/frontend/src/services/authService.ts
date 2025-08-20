import axios from 'axios'
import { User } from '../types'

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
})

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me')
    return response.data
  },
}