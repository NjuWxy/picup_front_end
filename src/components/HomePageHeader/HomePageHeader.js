/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Icon, Avatar, message, Modal, Upload } from 'antd';
import styles from './HomePageHeader.less';
import { getUserName, isLogin, getWinHeight, getFansNum, getFollowedNum, getUserAvatar } from '../../utils/tools';

class HomePageHeader extends React.Component{

  render(){
    const winHeight = getWinHeight();
    const userSpaceHeight = winHeight/4;
    let username = getUserName();
    let fansNum = getFansNum();
    let followedNum = getFollowedNum();
    let avatar = this.props.avatar;
    if(this.props.location.pathname === '/UserGallery'){
      console.log(this.props.visitedUser);
      username = this.props.visitedUser.username;
      fansNum = this.props.visitedUser.fansNum;
      followedNum = this.props.visitedUser.followedNum;
      avatar = this.props.visitedUser.avatar;
    }
    return(
      <div>
        <Row style={{ minHeight: userSpaceHeight }} className={styles.container}>
          <div className={styles.content}>
            <Col offset={1} span={10} style={{ marginTop: userSpaceHeight/2 }}>
              <img className={styles.avatar} src={getUserAvatar()} />
              <div className={styles.username}>{username}</div>
              <div className={styles.follows}>关注／{followedNum}</div>
              <div className={styles.fans}>粉丝／{fansNum}</div>
            </Col>
          </div>
        </Row>
      </div>
    )
  }
}



export default connect()(HomePageHeader);

