import { Card,Upload ,Spin, Button,Form, Input} from 'antd';
import React, { Component,createRef } from 'react';
import axios from 'axios'
import {  UploadOutlined } from '@ant-design/icons';
import {getNewAvatar} from '../../actions/user'
import{connect} from 'react-redux'


const  FormItem=Form.Item
const mapState=state=>({
   avatar:state.user.avatar,
   displayName:state.user.displayName
})
@connect(mapState,{getNewAvatar})

class Profile extends Component {
    state={
        isUploading:false,
        
        
    }

    formRef=createRef()
    //个人设置也提交数据
    onFinish=(data)=>{
         const newdata={...data,avatar:this.props.avatar}
         console.log(newdata);
    }
    uploadrequest=({file})=>{
        this.setState({
            isUploading:true
        })
     
       const data=new FormData()
       data.append('Token','2222c326c82efd7a4d357e11e0006394b8a03ca9:zoxN4M56uabXA8cMPqO_sBWonSw=:eyJkZWFkbGluZSI6MTYwMzQzMDE0MywiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzI4NjUyIiwiYWlkIjoiMTcyNTMzOSIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
       axios.post('http://up.imgapi.com/',data).then(res=>{
          this.setState({
            isUploading:false,
            
          })
          this.props.getNewAvatar(res.data.linkurl)
      })
    }

    render() {
        
        return (
         
            // <Card title='个人设置' bordered={false}>
            //     <Row gutter={16} >
            //     <Col md={{span:3}} style={{display:'flex',alignItems: 'center'}}><Typography.Title level={5}>头像设置：</Typography.Title></Col>
            //     <Col   md={{span:10,offset:0}} >
            //       <Upload
            //        customRequest={this.uploadrequest}
            //        showUploadList={false}
            //        >
            //         <Spin spinning={this.state.isUploading}>{
            //            this.props.avatar?<img src={this.props.avatar} alt="头像"/>:<Button icon={<UploadOutlined/>}>点击上传</Button>
            //         }</Spin>
            //       </Upload> 
            //    </Col>
            //    </Row>
               
            // </Card>
            <Card title='个人设置' bordered={false}>
                  <Form
                    onFinish={this.onFinish}
                    labelCol={{span:4}}
                    wrapperCol={{span:8,offset:1}}
                    ref={this.formRef}
                    
                   >
                   <FormItem 
                   style={{display:'flex',alignItems:'center'}} 
                   label="头像设置" name="avatar"
                   
                   >
                     
                <Upload
                   customRequest={this.uploadrequest}
                   showUploadList={false}
                   fileList={false}
                   >
                    <Spin spinning={this.state.isUploading}>{
                       this.props.avatar?<img src={this.props.avatar} alt="头像"/>:<Button icon={<UploadOutlined/>}>点击上传</Button>
                    }</Spin>
                  </Upload>
                  
                   </FormItem>   
                   <FormItem 
                      label="昵称"
                      name="displayName"
                      initialValue={this.props.displayName}
                      rules={[
                        {
                          required: true,
                          message: '昵称不能为空',
                          
                        },
                        
                      ]} 
                   >
    
                         
                           <Input  placeholder="请输入您要更改的昵称"></Input>
                       
                   </FormItem>
                   <FormItem wrapperCol={{span:8,offset:5}} >
                       <Button type="primary" htmlType='submit'>提交修改</Button>
                     </FormItem>
                  </Form>

            </Card>
        );
    }
}

export default Profile;