import axios from 'axios'
import{message} from 'antd'

const isDev=process.env.NODE_ENV==='development'

const service=axios.create({
    baseURL:isDev? 'http://rap2api.taobao.org/app/mock/268614':''
})
const service1=axios.create({
    baseURL:isDev? 'http://rap2api.taobao.org/app/mock/268614':''
})
//添加请求拦截器
service.interceptors.request.use(
    (config)=>{
   
        config.data=Object.assign({},config.data,
            {authToken:'dadaodjaso'}
        )
        return config
})

//添加响应拦截器
service.interceptors.response.use((res)=>{

   if(res.data.code===200){
       return res.data.data
   }else{
    message.error('错误！')
   }
  
})
//封装promise请求
const RequestPost=(url,params)=>{
    
   return new Promise((resolve,reject)=>{
    service.post(url,params).then(res=>{
        resolve(res)
    }).catch(err=>{
        
        reject(err)
    })
   });
}

//获取文章
export const getArticles=(offset=0,limited=10)=>{
       return RequestPost('/api/v1/article',{offset,limited})
    // return service.post('/api/v1/article',{offset,limited})
}
//删除文章
export const deleteArticles=(id)=>{
    return RequestPost(`/api/v1/deleteArticle/${id}`)
}
//修改文章
export const getEditArticles=(id)=>{
    return RequestPost(`api/v1/editArticle/${id}`)
}
//保存文章
export const SaveArticles=(id,data)=>{
    return RequestPost(`api/v1/updateArticle/${id}`,data)
}
//获取文章阅读量
export const getArticlesAmount=()=>{
    return RequestPost('api/v1/articleAmount')
}
//获取通知列表
export const getNotifiacations=()=>{
    return RequestPost('/api/v1/notifications')
}
//登录接口
export const login=(userInfo)=>{
    return service1.post('/api/v1/login',userInfo)
}