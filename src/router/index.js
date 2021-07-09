import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/display",
  //   component: () => import("./views/display.vue"),
  // },

  // {
  //   path: "/table-render",
  //   component: () => import("./views/table-render.vue"),
  // },
  // {
  //   path: "/table-slot",
  //   component: () => import("./views/table-slot.vue"),
  // },
  // {
  //   path: "/tree",
  //   component: () => import("./views/tree.vue"),
  // },
  // {
  //   path: "/input-number",
  //   component: () => import("./views/input-number.vue"),
  // },
  {
    path: "/checkbox",
    component: () => import("../views/checkbox.vue"),
  },
  {
    path: "/form",
    component: () => import("../views/form.vue"),
  },
  {
    path: "/alert",
    component: () => import("../views/alert.vue"),
  },
  {
    path: "/",
    component: () => import("../views/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
