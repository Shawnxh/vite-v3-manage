import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";
import store from "@/store";
import Cookies from "js-cookie";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/Login.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
    },
    {
        path: "/pro",
        name: "pro",
        component: () => import("@/views/home/home.vue"),
        redirect: "/pro/one/self",
        children: [
            {
                path: "one",
                name: "proOne",
                component: () => import("@/views/pro/one.vue"),
                children: [
                    {
                        path: "self",
                        name: "proOneSelf",
                        component: () => import("@/views/pro/self.vue"),
                    },
                ],
            },
            {
                path: "two",
                name: "proTwo",
                component: () => import("@/views/pro/two.vue"),
            },
        ],
    },
    {
        path: "/plus",
        name: "plus",
        component: () => import("@/views/home/home.vue"),
        redirect: "/plus/one",
        children: [
            {
                path: "one",
                name: "plusOne",
                component: () => import("@/views/plus/temp.vue"),
            },
            {
                path: "two",
                name: "plusTwo",
                component: () => import("@/views/plus/temp.vue"),
            },
        ],
    },
    {
        path: "/promax",
        name: "promax",
        component: () => import("@/views/home/home.vue"),
        redirect: "/promax/one",
        children: [
            {
                path: "one",
                name: "promaxOne",
                component: () => import("@/views/promax/temp.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 前置导航守卫
router.beforeEach((to, from, next) => {
    // 获取token
    const token = Cookies.get("token");
    if (token && to.name === "login") {
        store.dispatch("getUserInfo");
        next({ path: "home" });
    } else if (!token && to.name !== "login") {
        console.log(to);
        next({ name: "login" });
    } else {
        next();
    }
});

export const initRouter = (app: App<Element>) => {
    app.use(router);
};
