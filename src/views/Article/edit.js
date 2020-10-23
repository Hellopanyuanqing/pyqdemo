import { Button, Card ,Form, Input,message,Spin} from 'antd';
import React, { Component,createRef } from 'react';
import E from 'wangeditor'
import { UserOutlined } from '@ant-design/icons';
import { getEditArticles,SaveArticles} from '../../requests'



class ArticleEdit extends Component {
    formRef = React.createRef();
    constructor(){
        super()
      this.createRef=createRef()
      this.state={
        isSave:false,
      }
    }

 componentDidMount(){

    this.initEditer()
    getEditArticles().then(res=>{
      const {id,...data}=res
      this.formRef.current.setFieldsValue(data)
      this.editor.txt.html(data.content)
    })
   
 }
 initEditer=()=>{
     this.editor=new E(this.createRef.current)
     this.editor.create()
     this.editor.config.onchange =(newHtml)=> {
        this.formRef.current.setFieldsValue({
             content:newHtml
          });
      
       
    }
 }
 
//提交修改
onFinish = (values) => {
    this.setState({
      isSave:true,
    })
    
      SaveArticles(this.props.match.params.id,values).then(res=>{        
          message.success(res.msg);
          this.props.history.push('/admin/article')
        }).catch(err=>{
          message.error(err);
        }).finally(()=>{
          this.setState({
            isSave:false,
          })
        })



      };

    render() {
        return (
            <Card title="编辑文章" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>}>

      <Spin spinning={this.state.isSave}>       
    <Form
      initialValues={{
        remember: true,
      }}
      ref={this.formRef}
      onFinish={this.onFinish}
      labelCol={{span:4}}
      wrapperCol={{span:14}}
     
    >
      <Form.Item
        name="title"
        label="标题"
        initialValue="这个是默认标题"
        rules={[
          {
            required: true,
            message: '标题是必须的！',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="title" />
      </Form.Item>
      <Form.Item
        name="author"
        label="作者"
        rules={[
          {
            required: true,
            message: '作者是必须的！',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="author" />
      </Form.Item>
      <Form.Item
        name="amount"
        label="阅读量"
        rules={[
          {
            required: true,
            message: '阅读量是必须的！',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="0" />
      </Form.Item>
      <Form.Item
        name="content"
        label="内容"
        rules={[
          {
            required: true,
            message: '阅读量是必须的！',
          },
        ]}
      >
        <div ref={this.createRef}></div>
      </Form.Item>
      
     
      <Form.Item wrapperCol={{offset:4}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
         提交
        </Button>
      </Form.Item>

     
    </Form>
    </Spin>   
            </Card>
        );
    }
}

export default ArticleEdit;