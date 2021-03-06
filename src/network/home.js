import {request} from './request'

// const BANNER = 'banner'
// const RECOMMEND = 'recommend'

// export function getHomeMultiData(){
//     return request({
//         url: '/home/multidata'
//     })
// }

 export class HomeRequestHandler{
    constructor(){
        this.BANNER='banner',
        this.RECOMMEND = 'recommend'
    };

    getHomeMultiData(){
        return request({
            url: '/home/multidata'
        })
    }

    getHomeGoods(type,page){
        return request({
            url: '/home/data',
            params:{
                type,
                page
            }
        })
    }
}
// module.exports={
//     HomeHandler
// }
