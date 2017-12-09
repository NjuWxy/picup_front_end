import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form,Input, Button, Row, Col, Icon, message } from 'antd';
import styles from './PicDetail.less';
import { getWinHeight, isLogin, isSelf } from '../../utils/tools';



class PicDetail extends React.Component {
  state = {
    pointer: 0,
  };

  returnToHome = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  followAction = () => {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }
    if(this.props.detail.isFollowed){
      this.props.dispatch({
        type: 'users/unfollowUser',
        payload: {
          followedUsername: this.props.detail.userName,
          gid: this.props.location.query.gid,
        }
      });
    }else {
      this.props.dispatch({
        type: 'users/followUser',
        payload: {
          followedUsername: this.props.detail.userName,
          gid: this.props.location.query.gid,
        }
      });
    }
  };

  likeAction = () =>  {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }
    if(this.props.detail.isLiked){
      this.props.dispatch({
        type: 'gallery/unlikeGallery',
        payload: {
          gid: this.props.detail.gid,
          path: this.props.location.pathname
        }
      });
    }else {
      this.props.dispatch({
        type: 'gallery/likeGallery',
        payload: {
          gid: this.props.detail.gid,
          path: this.props.location.pathname
        }
      });
    }
  };

  last = () => {
    let pointer = this.state.pointer;
    if(this.state.pointer === 0){
       message.info("这已经是第一张了哟");
       return;
    }else {
      pointer = pointer - 1;
      this.setState({
        pointer
      })
    }
  };

  next = () => {
    let pointer = this.state.pointer;
    if(this.state.pointer === this.props.detail.pictures.length-1){
      message.info("这已经是最后一张了哟");
      return;
    }else {
      pointer = pointer + 1;
      this.setState({
        pointer
      })
    }
  };

  render() {
    const item = this.props.detail;
    const presentPic = this.props.detail.pictures[this.state.pointer];
    const minHeight = getWinHeight();
    const picHeight = minHeight/2;
    let followType = this.props.detail.isFollowed? '取消关注':'关注';
    let likeType = this.props.detail.isLiked?'heart':'heart-o';
    return(
      <Row className={styles.content} style={{minHeight: minHeight}}>
        <Col className={styles.leftPart} offset={1} span={17}>
          <Icon className={styles.close} type="close" onClick={this.returnToHome}/>
          <Icon className={styles.download} type="download" />
          <Row style={{minHeight: picHeight,marginTop: minHeight/6}}>
            <Col span={2}>
              <Icon className={styles.left} style={{marginTop: picHeight/2-50}} type="left" onClick={this.last} />
            </Col>
            <Col span={20} style={{textAlign: 'center'}}>
              <img style={{height: picHeight, width: 'auto'}} src={presentPic}/>
            </Col>
            <Col span={2}>
              <Icon className={styles.right} style={{marginTop: picHeight/2-50}} type="right" onClick={this.next} />
            </Col>
          </Row>
          <Row style={{marginTop: minHeight/10}}>
            <Col offset={11} span={2} className={styles.picIndex}>{this.state.pointer+1}/{item.pictures.length}</Col>
          </Row>
        </Col>
        <Col className={styles.rightPart} span={6} style={{minHeight: minHeight}}>
          <div className={styles.publisher}>
            <img className={styles.avatar} src={item.avatar}/>
            <span className={styles.username}>{item.userName}</span>
            {
              isSelf(item.userName)?
                null
                :
                <Button className={styles.follow} onClick={this.followAction }>{followType}</Button>
            }
          </div>
          <div>
            <div className={styles.info}>
              <Icon className={styles.like} type={likeType} onClick={this.likeAction} />
              <span className={styles.likeNum}>{item.likeNum}</span>
              <span className={styles.time}>{item.formatDate}</span>
            </div>
          </div>
          <div className={styles.tags} style={{minHeight: minHeight/8}}>
            {
              item.tags.map((tag,index) => {
                return <span key={index} className={styles.tag}>#{tag}</span>
              })
            }
          </div>
          <div className={styles.descriptionPart}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>
              {item.description}
            </p>
          </div>
        </Col>
      </Row>
    )
  }
}



function mapStateToProps(state) {
  const { detail } = state.gallery;
  return { detail };
}

export default connect(mapStateToProps)(PicDetail);


