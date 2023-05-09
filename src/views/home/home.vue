<template>
    <div class="homepage_container">
        <div class="homepage_header">头部</div>
        <div class="homepage_menu">
            <el-menu
                :ref="menuRef"
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu-vertical-demo"
                default-active="2"
                text-color="#fff"
                unique-opened
                router
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
            >
                <div v-for="menu in menus" :key="menu.id">
                    <el-sub-menu
                        v-if="menu.children?.length"
                        :index="'/' + menu.name"
                    >
                        <template #title>
                            <!-- <el-icon><location /></el-icon> -->
                            <span>{{ menu.title }}</span>
                        </template>
                        <div v-for="submenu in menu.children" :key="submenu.id">
                            <el-sub-menu
                                :index="'/' + menu.name + '/' + submenu.name"
                                v-if="
                                    submenu.hidden === 0 &&
                                    submenu.children?.length
                                "
                                ><template #title>
                                    <span>{{ submenu.title }}</span>
                                </template>
                                <div
                                    v-for="item in submenu.children"
                                    :key="item.id"
                                >
                                    <el-menu-item
                                        :index="
                                            '/' +
                                            menu.name +
                                            '/' +
                                            submenu.name +
                                            '/' +
                                            item.name
                                        "
                                        v-if="item.hidden === 0"
                                        >{{ item.title }}</el-menu-item
                                    >
                                </div>
                            </el-sub-menu>
                            <el-menu-item
                                v-else
                                :index="'/' + menu.name + '/' + submenu.name"
                                v-if="submenu.hidden === 0"
                                >{{ submenu.title }}</el-menu-item
                            >
                        </div>
                    </el-sub-menu>
                    <el-menu-item :index="'/' + menu.name" v-else>{{
                        menu.title
                    }}</el-menu-item>
                </div>
            </el-menu>
        </div>
        <div class="homepage_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref, toRefs, computed } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    interface MenuObj {
        name: string;
        id: number;
        parentId: number;
        hidden: number;
        title: string;
        children?: Array<MenuObj>;
    }
    // 获取项目路由对象
    let router = useRouter();
    const store = useStore();
    const menuRef = ref();

    // 计算属性监听menus的生成
    let menus = computed<{ [key: number]: MenuObj }>(
        () => store.getters.getNewMenus
    );

    const handleOpen = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
    };
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
    };
</script>

<style lang="scss" scoped>
    .homepage_container {
        position: relative;
        height: 100%;

        .homepage_header {
            height: 70px;
            background-color: antiquewhite;
        }

        .homepage_menu {
            position: absolute;
            top: 70px;
            left: 0;
            bottom: 0;
            width: 250px;
            background-color: beige;
        }

        .homepage_content {
            position: absolute;
            top: 70px;
            right: 0;
            bottom: 0;
            left: 250px;
            // background-color: skyblue;
        }
    }
</style>
