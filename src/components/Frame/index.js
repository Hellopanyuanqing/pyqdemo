import React, { Component } from 'react'
import { Layout, Menu ,Avatar,Dropdown,Badge} from 'antd';
import{withRouter} from 'react-router-dom'
import './frame.less'
import { DownOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {getNotifiacationsList} from "../../actions/notifications";
import {logout} from "../../actions/user";
const { Header, Content, Footer, Sider } = Layout;





const getMapState=state=>{
  
  return{
    notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length,
    avatar:state.user.avatar,
    displayName:state.user.displayName,

  }
}
@connect(getMapState,{getNotifiacationsList,logout})
@withRouter
class Frame extends Component {
  componentDidMount(){
   this.props.getNotifiacationsList()
  }
menuClick=({ key})=>{ 

    this.props.history.push(key)
    }
avatarMenuClick=({ key})=>{
  if(key==='/admin/logout'){
    this.props.logout()
  }else{
    this.props.history.push(key)
  }
  
  
}

 getDropMenu=()=>{
    return <Menu onClick={this.avatarMenuClick}>
        <Menu.Item  key="/admin/notifications">
          <Badge dot={Boolean(this.props.notificationsCount)}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item  key="/admin/porfile">
            个人设置
        </Menu.Item>
        <Menu.Item key="/admin/logout">
            退出登录
        </Menu.Item>
      </Menu>
   }
   
    render() {
    
      const selectedKeys=this.props.location.pathname.split('/');
      selectedKeys.length=3
     
        return (
            <Layout>
    <Header className="header">
      <div className="logo"/>
      <div> 
       
        <Dropdown overlay={this.getDropMenu()} placement="bottomCenter" >
          <div className="avatar-box">
            <Badge count={this.props.notificationsCount}>
             <Avatar style={{marginRight:'5px'}} src={this.props.avatar} />
          </Badge>
         <span>欢迎你！{this.props.displayName}</span>
           <DownOutlined/>
          </div>
        </Dropdown>
      
      </div>
     
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            onClick={this.menuClick}
            style={{ height: '100%' }}
            selectedKeys={[selectedKeys.join('/')]}
          >
           { this.props.menus.map(item=>{
            
           return( <Menu.Item  icon={item.icon} key={item.pathname}>
                  
                   {item.title}
                   </Menu.Item>)
           }) 
           }
          </Menu>
        </Sider>
        <Content style={{ padding: '20px', minHeight: 280 ,background:'#fff',margin:'0 0px 0 15px'}}>{this.props.children}</Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
        )
    }
}
export default Frame