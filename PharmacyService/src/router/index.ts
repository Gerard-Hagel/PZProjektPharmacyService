import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import ClientsView from '../views/ClientsView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import MedicinesView from '../views/MedicinesView.vue'
import DeniedAccessView from '../views/DeniedAccessView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/welcome', name: 'Welcome', component: WelcomeView },
  { path: '/invoice', name: 'Invoice', component: InvoiceView },
  { path: '/clients', name: 'Clients', component: ClientsView },
  { path: '/employees', name: 'Employees', component: EmployeesView, meta: { requiresAdmin: true } },
  { path: '/medicines', name: 'Medicines', component: MedicinesView },
  { path: '/denied', name: 'Denied', component: DeniedAccessView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (!token) {
    if (to.path !== "/login") {
      return next({ path: "/login" })
    } else {
      return next()
    }
  }

  const parts = token.split('.')
  if (parts.length !== 3 || !parts[1]) {
    console.error("Nieprawidłowy token JWT")
    localStorage.removeItem("token")
    return next({ path: "/login" })
  }

  let payload: { [key: string]: any }
  try {
    payload = JSON.parse(atob(parts[1]))
  } catch (err) {
    console.error("Błąd dekodowania tokena:", err)
    localStorage.removeItem("token")
    return next({ path: "/login" })
  }

  const rolesClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  const roles = Array.isArray(rolesClaim) ? rolesClaim : [rolesClaim]

  if (to.meta.requiresAdmin && !roles.includes("Admin")) {
    return next({ path: "/denied" })
  }

  next()
})

export default router