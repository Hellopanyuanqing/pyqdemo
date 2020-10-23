import { Button, Card, List,Avatar,Badge,Spin} from 'antd'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {markNotificationAsReadById,markAllNotificationAsRead} from '../../actions/notifications'

 const ListData=[];
 for (let i = 0; i < 50; i++) {
     ListData.push({
        title: `潘远清好好学习，天天向上 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:'潘远清好好学习，天天向上',
        content:'潘远清好好学习，天天向上。潘远清好好学习，天天向上。潘远清好好学习，天天向上。潘远清好好学习，天天向上。潘远清好好学习，天天向上。潘远清好好学习，天天向上。'
     })
     
 }
const mapState=state=>{
    const{
        list=[],
        isLoading
    }=state.notifications

    return {list,isLoading}
}

@connect(mapState,{markNotificationAsReadById,markAllNotificationAsRead})
 class Notifications extends Component {
    

    onShowSizeChange=()=>{

    }
    render() {
          console.log(this.props);
        return (
           <Spin spinning={this.props.isLoading}>
             <Card title="通知中心" bordered={false} extra={ <Button onClick={this.props.markAllNotificationAsRead.bind(this)} disabled={this.props.list.every(item=>item.hasRead===true)}>标记全部为已读</Button>}>
                 <List 
                     itemLayout='vertical' 
                     size='large'
                     dataSource={this.props.list}
                     pagination={{
                        
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:[5,10,15,25],
                        onShowSizeChange:this.onShowSizeChange,
                     }}
                     renderItem={item=>( 
                       <List.Item 
                          title={item.title}
                           extra={item.hasRead ? null :<Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)} >标记为已读</Button>

                     }
                     
                     >
                         <List.Item.Meta
                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                            description={item.desc}
                            avatar={<Avatar src={item.avatar}
                           
                            />}
                         />
                        {item.content}
                    
                   </List.Item>)}
                  >
                 </List>
             </Card>
             </Spin>
        )
    }
}
export default Notifications