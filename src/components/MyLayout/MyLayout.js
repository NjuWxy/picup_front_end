import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Icon, Input, Col, Row, Badge, Button, message } from 'antd';
import styles from './MyLayout.less';


const { Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class MyLayout extends React.Component {
  handleClick = (e) => {
    if(e.key === 'Logout'){
      this.props.dispatch({
        type: 'users/logout',
      })
    }else {
      this.props.dispatch(routerRedux.push({
        pathname: `/${e.key}`
      }));
    }
  };
  handleSearch = (e) => {
    console.log(e.target.value);
  };

  changeToPost = () => {
    if(!this.props.isLogin){
      message.error("woops,您还没有登陆哦");
      return;
    }
    this.props.dispatch(routerRedux.push({
      pathname: '/Post'
    }))
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
              <Button className={styles.post} onClick={this.changeToPost}>发布</Button>
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
  const { isLogin, userInfo } = state.users;
  let username = userInfo.username;
  return { isLogin, username };
}

export default connect(mapStateToProps)(MyLayout);

