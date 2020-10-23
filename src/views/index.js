 import loadable from 'react-loadable'
// import loadable from './loadable'
import{Loading}  from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import ArticleList from './Article'
// import ArticleEdit from './Article/edit'
// import Settings from './Settings'
// import NotFound from './NotFound'

const Dashboard=loadable({
    loader:()=>import('./Dashboard'),
    loading:Loading
})
const Login=loadable({
    loader:()=>import('./Login'),
    loading:Loading
})
const ArticleList=loadable({
    loader:()=>import('./Article'),
    loading:Loading
})
const ArticleEdit=loadable({
    loader:()=>import('./Article/edit'),
    loading:Loading
})
const Settings=loadable({
    loader:()=>import('./Settings'),
    loading:Loading
})
const NotFound=loadable({
    loader:()=>import('./NotFound'),
    loading:Loading
})
const Notifications=loadable({
    loader:()=>import('./Notifications'),
    loading:Loading
})
const NoAuth=loadable({
    loader:()=>import('./noAuth'),
    loading:Loading
})
const importViw=(url)=>{
   
    return loadable({
        loader:()=>import(`${url}`),
        loading:Loading
    })
     
}

const Profile =importViw('./Profile')


export{
    Dashboard,
    Login,
    ArticleList,
    ArticleEdit,
    Settings,
    NotFound,
    Notifications,
    NoAuth,
    Profile,
}