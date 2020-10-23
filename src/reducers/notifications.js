import actionTypes from '../actions/actionTypes'
const initState={
    isLoading:false,
    list:[
        {
       id:1,
       avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
       title:'潘远请要好好学习呀1！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
       desc:'潘远请要好好学习呀1！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
       hasRead:false
    },
    {
        id:2,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title:'潘远请要好好学习呀2！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        desc:'潘远请要好好学习呀2！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        hasRead:false
     },
     {
        id:3,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title:'潘远请要好好学习呀3！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        desc:'潘远请要好好学习呀3！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        hasRead:false
     },
     {
        id:4,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title:'潘远请要好好学习呀4！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        desc:'潘远请要好好学习呀4！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        hasRead:false
     },
     {
        id:5,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title:'潘远请要好好学习呀5！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        desc:'潘远请要好好学习呀5！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！潘远请要好好学习呀！',
        hasRead:false
     },
      
],
}

export default(state=initState,action)=>{
 
    switch(action.type){
       case actionTypes.POST_NOTIFICATIONS_ALL_LIST:
          return {
             ...state,
             list:action.payload.list
          }

        case actionTypes.START_MARK_AS_READ:
         return{
            ...state,
            isLoading:true
         }
         case actionTypes.FINISH_MARK_AS_READ:
            return {
               ...state,
               isLoading:false
            }
        case actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID:
      
           const newlist =state.list.map(item=>{
              if(item.id===action.payload.id){
                 item.hasRead=true
              } 
              return item
           })
           return {...state,list:newlist}
         case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            const newlist1 =state.list.map(item=>{
                  item.hasRead=true
               return item
            })
            return {...state,list:newlist1}
       default:
           return state
    }
}