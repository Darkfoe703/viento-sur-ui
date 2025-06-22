
import { createRouter, createWebHistory } from 'vue-router';
import AppointmentsView from '../components/AppointmentsView.vue'; // Crea estos componentes si no existen
import PatientsView from '@/components/PatientsView.vue';
import SchedulesView from '@/components/SchedulesView.vue'; 
import TestView from '@/components/TestView.vue';
import DashboardView from '@/components/DashboardView.vue';
const routes = [
  { path: '/calendar', name: 'Calendar', component: AppointmentsView },
  { path: '/patients', name: 'Patients', component: PatientsView},
  { path: '/schedules', name: 'Schedules', component: SchedulesView},
  // { path: '/', redirect: '/calendar' },
  { path: '/', name: 'TestView', component: TestView},
  { path: '/', name: 'DashboardView', component: DashboardView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;