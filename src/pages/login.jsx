import React from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import qs from 'querystring'
import { request } from '../utility/request'

class NormalLoginForm extends React.Component {
    state = {
        checked: true,
        countDown:30,
        countDown_begin:false,
        cd_timer:null
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let that = this;
            if (!err) {
                console.log('Received values of form: ', values);
                request({
                    url:'Officialweb.Login',
                    method:'POST',
                    body:qs.stringify(values)
                }).then(function(res){
                    console.log(res)
                    if(res.flag === 200){
                        message.success('登陆成功！', 1.5,()=>{
                            localStorage.setItem('upload_token',res.data.key);
                            // localStorage.setItem('personal_info',JSON.stringify(res.data)); 
                            clearInterval(that.state.cd_timer);
                            that.props.handleLogin()
                        })
                    }else{
                        message.warn(res.msg);
                    }
                })
            }
        });
    };

    handleCountDown = () => {
        
        this.setState({
            countDown:29,
            countDown_begin:true,
            cd_timer:setInterval(()=>{
                let coountd = this.state.countDown;
                this.setState({
                    countDown:(coountd-1),
                    countDown_begin:true
                },()=>{
                    if(this.state.countDown === 0){
                        clearInterval(this.state.cd_timer);
                        this.setState({
                            countDown:30,
                            countDown_begin:false
                        })
                    }
                })
            },1000)
        })
        
    }

    getVerifyCode = () => {
        if(this.state.countDown_begin){
            return
        }
        console.log(this.props.form.getFieldValue('MemberPhone'))
        const MemberPhone = this.props.form.getFieldValue('MemberPhone');
        const that = this;
        if(MemberPhone === '' || MemberPhone.length!==11){
            message.error('请输入正确手机号~');
            return
        }else{
            that.handleCountDown();
            request({
                url:'Officialweb.GetVerifycode',
                method:'POST',
                body:qs.stringify({MemberPhone})
            }).then(function(res){
                console.log(res)
                
            })
        }
        
        
    }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { countDown_begin } = this.state;
    return (
            <div className="loginWraper">
                {/* <img src="http://cdnimg.yijiahaohuo.com/activity/a91e0f1337f472101953c2780a59ea0c.jpeg?imageslim" alt=""/> */}
                <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item key="aa" duration={1000}>
                            <div className="login-title">
                                <img src={require('../images/logo.png')} alt=""/>
                            </div> 
                        </Form.Item>

                        <Form.Item hasFeedback key="bb">
                        {getFieldDecorator('MemberPhone', {
                            initialValue:'',
                            rules: [{ required: true, message: '请输入手机号' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            placeholder="请输入手机号"
                            className="login-input"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item hasFeedback key="cc">
                        {getFieldDecorator('VerifyCode', {
                            rules: [{ required: true, message: '请输入您的密码！' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            className="login-input"
                            suffix={
                                <Button type="primary" style={{marginRight:13}} size="small" ghost onClick={this.getVerifyCode} >{countDown_begin?`剩余${this.state.countDown}秒`:"获取验证码"}</Button>
                            }
                            placeholder="请输入验证码"
                            
                            />,
                        )}
                        </Form.Item>
                        <Form.Item key="dd">
                        
                            <div>    
                            <Button block type="primary" htmlType="submit" className="login-form-button" style={{fontSize:16}} size="large">
                                登陆
                            </Button>
                            </div>
                        </Form.Item>
                </Form>
                
            </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm