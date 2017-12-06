import React from 'react';
import { Form,Input, Button,Icon, Row, Col } from 'antd';
import styles from './ChangePsw.less';
import MyLayout from '../../../components/MyLayout/MyLayout';
import Nav from '../../../components/Nav/Personal/Nav';

const FormItem = Form.Item;

class ChangePsw extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <MyLayout>
        <Nav location={this.props.location} />
        <Row className={styles.content}>
          <Col offset={9} span={6}>
            <Form onSubmit={this.handleSubmit} className={styles.form}>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: '邮箱格式不正确!'},
                    { required: true, message: '请输入您的邮箱!' }],
                })(
                  <Input className={styles.input} prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
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
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

const ChangePswForm = Form.create()(ChangePsw);

export default ChangePswForm;

