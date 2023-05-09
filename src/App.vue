<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
const store = useStore();

if (window.localStorage.getItem("list")) {
    store.replaceState(
        Object.assign(
            {},
            store.state,
            JSON.parse(window.localStorage.getItem("list") as string)
        )
    );
}

window.addEventListener("beforeunload", () => {
    window.localStorage.setItem("list", JSON.stringify(store.state));
});
</script>

<style lang="scss">
@import url("./assets/styles/base.scss");
html,
body {
    height: 100%;
}
#app {
    height: 100%;
}
</style>
