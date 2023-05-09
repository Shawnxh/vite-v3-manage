export {};
//创建一个对象obj，其中的friend属性也是一个对象，friend里的student也是一个对象
const obj: any = {
    name: "ls",
    age: 4,
    sex: "nan",
    friend: {
        name: "djw",
        age: 24,
        sex: "nan",
        student: {
            name: "xlq",
            age: 23,
            sex: "nan",
        },
    },
};

function clone(obj: any) {
    if (typeof obj != "object") {
        //判断目标对象数据类型，不是对象则直接返回
        return obj;
    }
    var newObj: any = {}; //创建一个空对象，用以存放遍历后克隆的属性
    for (let k in obj) {
        newObj[k] = clone(obj[k]); //用递归实现深克隆
    }
    return newObj;
}
