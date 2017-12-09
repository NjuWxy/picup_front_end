import React from 'react';
import { Row, Col } from 'antd';
import styles from './Login.less';
import MyLayout from '../../components/MyLayout/MyLayout';
import LoginForm from '../../components/LoginForm/LoginForm';

class Login extends React.Component {

  render() {
    return(
      <MyLayout locaiton={this.props.location}>
        <Row className={styles.content}>
          <Col offset={9} span={6}>
            <LoginForm />
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

export default Login;

