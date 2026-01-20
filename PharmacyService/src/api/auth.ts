import api from './axios'

export interface User {
  id: number
  email: string
  role: string
  [key: string]: any
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function setUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUser(): User | null {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
}

export function logout() {
  removeToken()
  localStorage.removeItem('user')
}

export async function login(email: string, password: string) {
  const res = await api.post('/api/auth/login', { email, haslo: password })
  const token = res.data.token
  setToken(token)

  const me = await api.get<User>('/api/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  setUser(me.data)
  return me.data
}