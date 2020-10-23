import { Card,Upload ,Spin, Button} from 'antd';
import React, { Component } from 'react';
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons';

class Profile extends Component {
    state={
        isUploading:false,
        avatar:''
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
            avatar:res.data.linkurl
          })
      })
    }
    render() {
        return (
            <Card title='个人设置' bordered={false}>
                <Upload
                   customRequest={this.uploadrequest}
                   showUploadList={false}
                 >
                    <Spin spinning={this.state.isUploading}>{
                       this.state.avatar?<img src={this.state.avatar}/>:<Button icon={<UploadOutlined/>}>点击上传</Button>
                    }</Spin>
               </Upload> 
            </Card>
        );
    }
}

export default Profile;