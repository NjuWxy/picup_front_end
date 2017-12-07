import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import styles from './LoginForm.less';

const FormItem = Form.Item;

class Login extends React.Component {
  state = {
    isLoginForm: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: this.state.isLoginForm?'users/login':'users/signUp',
          payload:values
        })
    }})
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        {
          this.state.isLoginForm?
            <h2 className={styles.header}>精彩，等你来秀！</h2>
            :
            <h2 className={styles.header}>👏&nbsp;&nbsp;欢迎加入我们</h2>
        }
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '昵称不能为空!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="昵称" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.form_button}>
            {
              this.state.isLoginForm?<span>登陆</span>:<span>注册</span>
            }
          </Button>
          <div className={styles.changeFormPart}>
            {
              this.state.isLoginForm?
                <div>没有账号？<span className={styles.changeForm} onClick={()=>this.setState({isLoginForm:false})}>马上注册!</span></div>
              :
                <div>已有账号？<span className={styles.changeForm} onClick={()=>this.setState({isLoginForm:true})}>立即登陆!</span></div>
            }
          </div>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(Login);

export default connect()(LoginForm);
