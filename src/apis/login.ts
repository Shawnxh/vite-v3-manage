import request from "@/request/request";

type PromiseRes<T> = Promise<Res<T>>;

interface Res<T = {}> {
    code: number;
    message: string;
    data: T;
}
// 登陆返回接口
interface loginRes {
    tokenHead: string;
    token: string;
}


// 登陆
export const userLogin = (data: any): PromiseRes<loginRes> =>
    request.post("/api/admin/login", data);

// 用户信息
export const userInfo = (data?: any): PromiseRes<{ menus: {} }> =>
    request.get("/api/admin/info", data);
