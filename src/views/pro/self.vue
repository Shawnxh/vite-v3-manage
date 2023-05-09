<template>
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="headerCell"
    >
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="400" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column prop="tag" label="tag" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
                <el-button
                    link
                    type="primary"
                    size="small"
                    @click="editForm(row)"
                    >编辑</el-button
                >
                <el-button link type="primary" size="small" @click="editForm"
                    >详情</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <EditForm
        :visible="visible"
        :form="rowData"
        @close="closeDialog"
        @ok="confirm"
    ></EditForm>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import EditForm from "./components/EditForm.vue";

const headerCell = (row:unknown) => {
    console.log(row);

    return { "text-align": "center ", "font-size": "20px" };
};

const state = reactive({
    tableData: [
        {
            id: 1,
            date: "2016-05-03",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Home",
        },
        {
            id: 2,
            date: "2016-05-02",
            name: "shawn",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Office",
        },
        {
            id: 3,
            date: "2016-05-04",
            name: "jim",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Home",
        },
        {
            id: 4,
            date: "2016-05-01",
            name: "xiaohao",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Office",
        },
    ],
    visible: false,
    rowData: {},
});
let { tableData, visible, rowData } = toRefs(state);

const editForm = (row?: any) => {
    visible.value = true;
    rowData.value = row;
};

const closeDialog = () => {
    visible.value = false;
};

const confirm = (newRowData: any) => {
    console.log(newRowData);
    tableData.value = tableData.value.map((item) => {
        if (item.id === newRowData.id) {
            item = { ...newRowData };
        }
        return item;
    });
};
</script>

<style lang="scss" scoped></style>
