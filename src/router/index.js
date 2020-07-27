import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Cart = () => import("views/cart/Cart");
const Profile = () => import("views/profile/Profile");
// const Detail = () => import('views/detail/Detail')

// 1.安装VueRouter
Vue.use(VueRouter);

// 2.配置路由信息
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "主页"
    },

  },
  {
    path: "/category",
    component: Category,
    meta: {
      title: "列表"
    }
  },
  {
    path: "/cart",
    component: Cart,
    meta: {
      title: "购物车"
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      title: "文档"
    }
  }
  // {
  //   path: '/detail',
  //   component: Detail
  // }
];

// 3.创建路由对象
const router = new VueRouter({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
});
// 4.导出
export default router;
