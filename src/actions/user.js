import actionTypes from './actionTypes'
import{login as loginRequest} from '../requests'

const startLogin=()=>{
    return{
        type:actionTypes.START_LOGIN
    }
}
const loginSuccess=(userInfo)=>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}
const loginFailed=()=>{
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return{
        type:actionTypes.LOGIN_FAILED
    }
}

export const getNewAvatar=(avatarUrl)=>{
      return{
          type:actionTypes.GET_NEW_AVATAR,
          payload:{
            avatarUrl
          }
      }

 }

export const logout=()=>{
   return dispatch=>{
       dispatch(loginFailed())
   } 
}

export const login=(userInfo)=>{
    return dispatch=>{
        dispatch(startLogin())
        loginRequest(userInfo).then(res=>{
        
            if(res.data.code===200){
                const {authToken,...user}=res.data.data
               
                if(userInfo.remember===true){
                    window.localStorage.setItem('authToken',authToken)
                    window.localStorage.setItem('userInfo',JSON.stringify(user))
                }else{
                    window.sessionStorage.setItem('authToken',authToken)
                    window.sessionStorage.setItem('userInfo',JSON.stringify(user))
                }
                dispatch(loginSuccess(
                res.data.data
                    
                ))
            }else{
                dispatch(loginFailed())
            }
        })
        
    }
}