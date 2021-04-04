import Vue from "vue";
import VueRouter from "vue-router";
import Marubatu from "../components/marubatu.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/marubatu",
    name: "Marubatu",
    component: Marubatu,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
