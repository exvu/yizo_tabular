export namespace method {
    export type GET = 'GET';
    export type POST = 'POST';
    export type DELETE = 'DELETE';
    export type PUT = 'PUT';
}

export interface Api {

    //请求的api
    name: string,
    //请求的方法
    method: method.GET | method.POST | method.DELETE | method.PUT,
    request: {
        params?: { [i: string]: any }
    },
    respose: any

}

export class String<T1 extends number=any, T2 extends number=any>{

}


export class Number<T extends number=any>{

}


export function md5(): void