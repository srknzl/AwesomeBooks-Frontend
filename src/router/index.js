import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Shop from "../views/Shop";
import BookDetail from "../views/BookDetail";
import Login from "../views/Login";
import UserReset from "../views/UserReset";
import Signup from "../views/Signup";
import Welcome from "../views/Welcome";
import Cart from "../views/Cart";
import store from "../store";

Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   route level code-splitting
    //   this generates a separate chunk (about.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: BookDetail
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/resetPassword",
      name: "userreset",
      component: UserReset
    },
    {
      path: "/welcome",
      name: "userwelcome",
      component: Welcome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/logout",
      name: "logout",
      async beforeEnter(to, from, next) {
        try {
          await store.dispatch("logout");
          next("/");
        } catch (error) {
          next("/");
        }
      }
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: "history"
});


router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      await store.dispatch("checklogin", {
        redirect: "noredirect"
      });
    }                                                                                                                                                                                                                                                                                                                                     
    if (!store.state.loggedIn) {
      next({
        path: '/giris',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});
function getRoutesList(routes, pre) {
  return routes.reduce((array, route) => {
    const path = `${pre}${route.path}`;

    if (route.path !== "*") {
      array.push(path);
    }

    if (route.children) {
      array.push(...getRoutesList(route.children, `${path}/`));
    }

    return array;
  }, []);
}
function getRoutesXML() {
  const list = getRoutesList(
    router.options.routes,
    "https://awesomebook.store"
  )
    .map(route => `<url><loc>${route}</loc></url>`)
    .join("\r\n");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
}
console.log(getRoutesXML());

export default router;
