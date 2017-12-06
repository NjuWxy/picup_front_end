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
      <Col offset={9} span={10}>
        <Menu
          onClick={handleClick}
          selectedKeys={[location.pathname.substring(1)]}
          mode="horizontal"
          className={styles.category}
        >
          <Menu.Item key="ChangePsw" className={styles.menuItem}>修改密码</Menu.Item>
          <Menu.Item key="FollowManage" className={styles.menuItem}>关注管理</Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {

}

export default connect()(Nav);
