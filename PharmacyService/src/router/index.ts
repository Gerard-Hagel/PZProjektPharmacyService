import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import ClientsView from '../views/ClientsView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import MedicinesView from '../views/MedicinesView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/welcome', name: 'Welcome', component: WelcomeView },
    { path: '/invoice', name: 'Invoice', component: InvoiceView },
    { path: '/clients', name: 'Clients', component: ClientsView },
    { path: '/employees', name: 'Employees', component: EmployeesView },
    { path: '/medicines', name: 'Medicines', component: MedicinesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router