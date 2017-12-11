import React from 'react';
import { Form,Input, Button,Icon, Row, Col } from 'antd';
import styles from './PersonSetting.less';
import MyLayout from '../../../components/MyLayout/MyLayout';
import Nav from '../../../components/Nav/Personal/Nav';
import ChangePswForm from '../../../components/ChangePswForm/ChangePswForm';
import ChangeAvatarForm from '../../../components/ChangeAvatarForm/ChangeAvatarForm';
import HomePageHeader from '../../../components/HomePageHeader/HomePageHeader';


function PersonalSetting({ dispatch, location }) {
  return(
    <MyLayout location={location}>
      <HomePageHeader location={location} />
      <Nav location={location} />
      <Row className={styles.content}>
        <Col offset={6} span={6}>
          <ChangePswForm />
        </Col>
        <Col offset={2} span={4}>
          <ChangeAvatarForm />
        </Col>
      </Row>
    </MyLayout>
  )
}



export default PersonalSetting;

