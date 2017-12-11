import React from 'react';
import { Row, Col, Menu } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Nav.less';

function Nav ({ dispatch, location }){
   function handleClick(e){
    console.log(e.key);
    dispatch(routerRedux.push({
      pathname: `/${e.key}`
    }));
  }
  return(
    <Row className={styles.top}>
      <Col offset={7} span={10}>
        <Menu
          onClick={handleClick}
          selectedKeys={[location.pathname.substring(1)]}
          mode="horizontal"
          className={styles.category}
        >
          <Menu.Item key="MyGallery" className={styles.menuItem}>我的动态</Menu.Item>
          <Menu.Item key="PersonSetting" className={styles.menuItem}>个人设置</Menu.Item>
          <Menu.Item key="FollowManage" className={styles.menuItem}>关注管理</Menu.Item>
          <Menu.Item key="MyMessage" className={styles.menuItem}>我的消息</Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {

}

export default connect()(Nav);
