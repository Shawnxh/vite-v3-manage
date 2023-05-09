<template>
    <div>
        <el-select
            multiple
            v-model="value"
            placeholder="Select"
            size="large"
            @change="handChange"
            :style="{ width: '500px' }"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";

const state = reactive({
    value: [1, 5],
});

let { value } = toRefs(state);

const options = [
    {
        value: 1,
        label: "Option1",
    },
    {
        value: 2,
        label: "Option2",
    },
    {
        value: 3,
        label: "Option3",
    },
    {
        value: 4,
        label: "Option4",
    },
    {
        value: 5,
        label: "Option5",
    },
];

const handChange = (param: unknown) => {
    console.log(param);
};
</script>

<style lang="scss" scoped></style>
