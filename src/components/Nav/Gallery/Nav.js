import React from 'react';
import { Row, Col, Menu, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Nav.less';
import { isLogin } from '../../../utils/tools';

function Nav ({ dispatch, location }){
  function handleClick(e){
    console.log(e.key);
    if(e.key === 'InterestGallery' && !isLogin()) {
      message.error("woops,你还没有登陆");
      return;
    }
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
          <Menu.Item key="HotGallery" className={styles.menuItem}>推荐列表</Menu.Item>
          <Menu.Item key="LatestGallery" className={styles.menuItem}>最新发布</Menu.Item>
          <Menu.Item key="InterestGallery" className={styles.menuItem}>我的关注</Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {

}

export default connect()(Nav);

