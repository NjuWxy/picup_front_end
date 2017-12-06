import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Icon, Input, Col, Row, Dropdown, BackTop, Badge, Button } from 'antd';
import styles from './MyLayout.less';


const { Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class MyLayout extends React.Component {
  handleClick = (e) => {
    if(e.key === 'Login'){
      this.showLogin();
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: `/${e.key}`
      }));
    }
  };
  handleSearch = (e) => {
    console.log(e.target.value);
  };
  showLogin = () => {
    this.props.dispatch({
      type: 'modalStates/showLogin',
      payload: { showLogin: true }
    })
  };
  hideLogin = () => {
    this.props.dispatch({
      type: 'modalStates/showLogin',
      payload: { showLogin: false }
    })
  };
  render(){
    return (
      <Layout className={styles.layout}>
        <div className={styles.header}>
          <Row>
            <Col offset={1} span={2}>
              <div className={styles.logo}>PicUp</div>
            </Col>
            <Col span={4}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={['']}
                mode="horizontal"
                className={styles.menus}
              >
                <Menu.Item key="HotGallery">首页</Menu.Item>
                <Menu.Item key="Album">相册</Menu.Item>
              </Menu>
            </Col>
            <Col span={4}>
              <Input
                placeholder="搜索画廊"
                className={styles.search}
                onPressEnter={this.handleSearch}
              />
            </Col>
            <Col offset={8} span={2}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={['']}
                mode="horizontal"
                className={styles.menus}
                style={{ float: 'right'}}
              >
                {
                  this.props.isLogin
                    ?
                    <SubMenu
                      title={<span>{this.props.username}</span>}
                    >
                      <Menu.Item key="ChangePsw">个人中心</Menu.Item>
                      <Menu.Item key="Logout">退出登陆</Menu.Item>
                    </SubMenu>
                    :
                    <Menu.Item key="Login">登录/注册</Menu.Item>
                }
              </Menu>
            </Col>
            <Col span={1}>
              <Badge className={styles.badge} dot>
                <Icon className={styles.notification} type="notification" />
              </Badge>
            </Col>
            <Col span={1}>
              <Button className={styles.post}>发布</Button>
            </Col>
          </Row>
        </div>
        <Content className={styles.content}>
          {this.props.children}
        </Content>
        <Footer className={styles.footer}>
          PicUp ©2017 Created by Gao Yue
        </Footer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const { isLogin, username } = state.users;
  const { showLogin, showPostPhoto } = state.modalStates;
  return { isLogin, username, showLogin, showPostPhoto };
}

export default connect(mapStateToProps)(MyLayout);

