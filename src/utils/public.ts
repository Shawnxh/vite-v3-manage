interface MenuObj {
    id: number;
    parentId: number;
    hidden: number;
    title: string;
}
const R = function recursion(menus: Array<MenuObj>): {} {
    let fa = [];
    const newMenus: any = {};
    menus.forEach((item, index) => {
        if (item.parentId === 0) {
            fa.push(item.id);
        }
    });

    menus.forEach((item, index) => {
        if (item.parentId === 0) {
            newMenus[item.id] = { ...item };
        } else {
            let pid = item.parentId;
            newMenus[pid] = newMenus[pid] || {};
            newMenus[pid].children = newMenus[pid].children || [];
            newMenus[pid].children.push(item);
        }
    });

    console.log(newMenus);

    return newMenus;
};

// const R = function recursion(menus: Array<MenuObj>): {} {
//     const newMenus: any = {};
//     menus.forEach((item, index) => {
//         if (item.parentId === 0) {
//             newMenus[item.id] = { ...item };
//         } else {
//             let pid = item.parentId;
//             newMenus[pid] = newMenus[pid] || {};
//             newMenus[pid].children = newMenus[pid].children || [];
//             newMenus[pid].children.push(item);
//         }
//     });
//     console.log(newMenus);

//     return newMenus;
// };

export default { R };
