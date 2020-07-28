import {request} from './request'

// const BANNER = 'banner'
// const RECOMMEND = 'recommend'

// export function getHomeMultiData(){
//     return request({
//         url: '/home/multidata'
//     })
// }

 export class DetailRequestHandler{
    getDetailData(iid){
        return request({
            url: '/detail',
            params: {
              iid
            }
        })
    }
}
// module.exports={
//     HomeHandler
// }
