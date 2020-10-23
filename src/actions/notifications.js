import actionTypes from './actionTypes'
import {getNotifiacations} from '../requests'

const startMarkAsRead=()=>{
    return{
        type:actionTypes.START_MARK_AS_READ
    }
}
const finshMarkAsRead=()=>{
    return{
        type:actionTypes.FINISH_MARK_AS_READ
    }
}

export const markNotificationAsReadById=(id)=>{
    return dispatch=>{
        dispatch(startMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID,
                payload:{
                    id
                },
            })
            dispatch(finshMarkAsRead())
        },2000)
     
    }
   
}

export const markAllNotificationAsRead=()=>{
    return dispatch=>{
        dispatch(startMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ,
            })
            dispatch(finshMarkAsRead())
        },2000)
    }
}

export const getNotifiacationsList=()=>{
    return dispatch=>{
        dispatch(startMarkAsRead())
        getNotifiacations().then(res=>{
            dispatch({
                type:actionTypes.POST_NOTIFICATIONS_ALL_LIST,
                payload:{
                    list:res.list
                }
            })
            dispatch(finshMarkAsRead())
        })
    }
}

