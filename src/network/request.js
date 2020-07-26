import axios from 'axios'

export function request(config){
  const instance =axios.create({
    baseURL: config.baseURL,
    timeout:  config.timeout
  });

  //拦截器的使用interceptors
  instance.interceptors.request.use(config=>{
    // console.log(config);
    //1对config做转换
    //2显示请求的图标
    //3某些网络请求必须携带的东西，如token。可以进行验证有没有，进行跳转
    return config;
  },err=>{
    console.log(err);
  })
  instance.interceptors.response.use(res=>{
    console.log(res);
    return res;
  },err=>console.log(err))
  return instance(config);
}


