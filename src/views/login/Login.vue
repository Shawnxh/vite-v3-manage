<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
        <el-form-item label="用户名" prop="username">
            <el-input
                v-model="ruleForm.username"
                type="text"
                autocomplete="off"
            />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <el-input
                v-model="ruleForm.pwd"
                type="password"
                autocomplete="off"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login()">登陆</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import Cookies from "js-cookie";
import { userLogin, userInfo } from "@/apis/login";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 获取项目路由对象
let router = useRouter();
// 获取项目vuex对象
let store = useStore();
// 获取表单组件对象
const ruleFormRef = ref();

const state = reactive({
    ruleForm: { username: "admin", pwd: "123456" },
});
let { ruleForm } = toRefs(state);

const validatePwd = (
    rule: any,
    value: any,
    callback: (msg?: string) => void
) => {
    if (!value) {
        callback("Please input the password");
    } else {
        callback();
    }
};
// 校验规则
const rules = reactive({
    username: [
        {
            required: true,
            message: "用户名不能为空!",
            trigger: "blur",
        },
    ],
    pwd: [{ validator: validatePwd, trigger: "blur" }],
});

const login = () => {
    ruleFormRef.value
        .validate()
        .then(() => {
            console.log("校验通过");
            Cookies.set("token", "123", { expires: 1 });
            router.push("/home");
            return;
            userLogin({
                username: ruleForm.value.username,
                password: ruleForm.value.pwd,
            }).then((res) => {
                if (res.code === 200) {
                    // 存储cookie
                    Cookies.set("token", "", { expires: 7 });
                    store.dispatch("getUserInfo").then((res) => {
                        // 跳转首页
                        router.push("/home");
                    });
                }
            });
        })
        .catch(() => {
            console.log("校验不通过!");
        });
};
const resetForm = (form: FormInstance | undefined) => {
    if (!form) return;
    form.resetFields();
};
</script>

<style lang="scss" scoped></style>
