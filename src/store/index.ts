import { createStore } from "vuex";
import { App } from "vue";
import _public from "@/utils/public";
import { userInfo } from "@/apis/login";
interface MenuObj {
    name: string;
    id: number;
    parentId: number;
    hidden: number;
    title: string;
    children?: Array<any>;
}

interface StateItf {
    menus: Array<MenuObj>;
}
interface NewMenus {
    [key: number]: MenuObj;
}

const store = createStore<StateItf>({
    state() {
        return {
            // menus: [
            //     { hidden: 0, id: 1, title: "订单1", parentId: 0 },
            //     { hidden: 0, id: 11, title: "订单1-1", parentId: 1 },
            //     { hidden: 0, id: 12, title: "订单1-2", parentId: 1 },
            //     { hidden: 0, id: 2, title: "订单2", parentId: 0 },
            //     { hidden: 0, id: 21, title: "订单2-1", parentId: 2 },
            //     { hidden: 0, id: 22, title: "订单2-2", parentId: 2 },
            //     { hidden: 0, id: 211, title: "订单2-1-1", parentId: 21 },
            //     { hidden: 0, id: 111, title: "订单1-1-1", parentId: 11 },
            //     { hidden: 0, id: 3, title: "订单3", parentId: 0 },
            // ],
            menus: [
                {
                    name: "pro",
                    hidden: 0,
                    id: 1,
                    title: "订单1",
                    parentId: 0,
                    children: [
                        {
                            name: "one",
                            hidden: 0,
                            id: 11,
                            title: "订单1-1",
                            parentId: 1,
                            children: [
                                {
                                    name: "self",
                                    hidden: 0,
                                    id: 111,
                                    title: "订单1-1-1",
                                    parentId: 11,
                                },
                            ],
                        },
                        {
                            name: "two",
                            hidden: 0,
                            id: 12,
                            title: "订单1-2",
                            parentId: 1,
                        },
                    ],
                },
                {
                    name: "plus",
                    hidden: 0,
                    id: 2,
                    title: "订单2",
                    parentId: 0,
                    children: [
                        {
                            name: "one",
                            hidden: 0,
                            id: 21,
                            title: "订单2-1",
                            parentId: 2,
                        },
                        {
                            name: "two",
                            hidden: 0,
                            id: 22,
                            title: "订单2-2",
                            parentId: 2,
                        },
                    ],
                },
                {
                    name: "promax",
                    hidden: 0,
                    id: 3,
                    title: "订单3",
                    parentId: 0,
                    children: [],
                },
            ],
        };
    },
    getters: {
        getNewMenus(state) {
            const newMenus: NewMenus = state.menus;
            // const newMenus: NewMenus = _public.R(state.menus);
            return newMenus;
        },
    },
    mutations: {
        updateMenus(state, menus) {
            state.menus = menus;
        },
    },
    actions: {
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                userInfo()
                    .then((res) => {
                        if (res.code === 200) {
                            commit("updateMenus", res.data.menus);
                            resolve(res.data);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
    modules: {},
});

export const initStore = (app: App<Element>) => {
    app.use(store);
};

export default store;
