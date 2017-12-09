import React from 'react';
import { connect } from 'dva';
import { Form,Input, Button,Icon, Row, Col, message } from 'antd';
import styles from './ChangePswForm.less';

const FormItem = Form.Item;

class ChangePsw extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const oldPassword = values.oldPassword;
        const newPassword = values.newPassword;
        const confirmPassword = values.confirmPassword;
        if( newPassword !== confirmPassword ){
          message.error("两次输入的新密码不一致");
          return;
        }else {
          this.props.dispatch({
            type: 'users/changePassword',
            payload: {
              oldPassword, newPassword
            }
          })
        }
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <h2 className={styles.header}>修改密码</h2>
        <FormItem>
          {getFieldDecorator('oldPassword', {
            rules: [
              { required: true, message: '请输入原密码!' }],
          })(
            <Input className={styles.input} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="原密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: '请输入新密码!' }],
          })(
            <Input className={styles.input} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="新密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: '请再次确认新密码!' }],
          })(
            <Input className={styles.input} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认新密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.form_button}>
            修改密码
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const ChangePswForm = Form.create()(ChangePsw);

export default connect()(ChangePswForm);


