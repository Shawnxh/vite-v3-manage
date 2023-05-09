<template>
    <el-dialog
        :model-value="visible"
        title="Shipping address"
        :before-close="close"
        :close-on-click-modal="false"
    >
        <el-form :model="formData" :label-width="formLabelWidth">
            <el-form-item label="name">
                <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="state">
                <el-input v-model="formData.state" autocomplete="off" />
            </el-form-item>
            <el-form-item label="tag">
                <el-input v-model="formData.tag" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="confirm"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from "vue";
interface PropsItf {
    visible: boolean;
    form: any;
}

// const props = defineProps<PropsItf>();
const props = withDefaults(defineProps<PropsItf>(), {
    visible: true,
    form: {},
});

const state = reactive<{
    formLabelWidth: string;
    formData: { name?: string; state?: string; tag?: string };
}>({
    formLabelWidth: "120px",
    formData: {},
});
let { formLabelWidth, formData } = toRefs(state);

watch(
    () => props.form,
    () => {
        formData.value = { ...props.form };
    }
);

const emit = defineEmits<{
    (event: "close"): void;
    (event: "ok", data: any): void;
}>();

const close = () => {
    emit("close");
};

const confirm = () => {
    emit("ok", formData.value);
};
</script>

<style lang="scss" scoped></style>
