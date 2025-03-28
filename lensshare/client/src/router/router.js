import { createWebHistory, createRouter } from "vue-router";
import LandingView from "../views/root/LandingView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";

// define routes
const routes = [
  {
    path: "/",
    component: LandingView,
  },
  {
    path: "/auth",
    component: LoginView,
  },
  ,
  {
    path: "/auth/register",
    component: RegisterView,
  },
  {
    path: "/dashboard",
    component: DashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
