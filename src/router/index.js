import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import EditContact from "../views/EditContact";
import NewContact from "../views/NewContact";
import ViewContact from "../views/ViewContact";
import Login from "../views/Login";
import Register from "../views/Register";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/new",
    name: "newContact",
    component: NewContact,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit/:contact_id",
    name: "editContact",
    component: EditContact,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/:contact_id",
    name: "viewContact",
    component: ViewContact,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
