import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect}  from 'react-redux'
import {login} from '../../actions/user'
import {Redirect} from 'react-router-dom'
import  './login.less'
const mapState=state=>({
    isLogin:state.user.isLogin,
    isLoading:state.user.isLoading,
})
@connect(mapState,{login})
class Login extends Component {


    onFinish = (values) => {
        this.props.login(values)
      
      
       };
   
    render() {
          
        return (
             
        this.props.isLogin?<Redirect to='/admin'/>:
        <Card className="login_box" title="潘远请的react登录系统">
            <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
     
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '用户名不能为空！',
          },
        ]}
      >
        <Input disabled={this.props.isLoading} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '密码不能为空！',
          },
        ]}
      >
        <Input
        disabled={this.props.isLoading}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码:"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox loading={this.props.isLoading}>记住我</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" >
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        或 <a href="">现在注册</a>
      </Form.Item>
    </Form>
    </Card>
        );
    }
}

export default Login;