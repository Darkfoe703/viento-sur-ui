// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "@/views/MainView.vue";
import DashboardView from "@/views/DashboardView.vue";
import AppointmentsView from "@/views/AppointmentsView.vue";
import PatientsView from "@/views/PatientsView.vue";
import SchedulesView from "@/views/SchedulesView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainView,
    children: [
      { path: "", name: "dashboard", component: DashboardView },
      { path: "calendar", name: "appointments", component: AppointmentsView },
      { path: "patients", name: "patients", component: PatientsView },
      { path: "schedules", name: "schedules", component: SchedulesView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
