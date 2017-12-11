import React from 'react';
import { Icon, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ImageCard.less';
import { isLogin } from '../../../utils/tools';


class ImageCard extends React.Component{
  /**
   * 跳转到分享详情
   */
   turnToDetail = () => {
     this.props.dispatch(routerRedux.push({
       pathname: '/PicDetail',
       query: {gid: this.props.item.gid,}
     }));
  };

  likeAction = () =>  {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }
    if(this.props.item.isLiked){
      this.props.dispatch({
        type: 'gallery/unlikeGallery',
        payload: {
          gid: this.props.item.gid,
          path: this.props.location.pathname
        }
      });
    }else {
      this.props.dispatch({
        type: 'gallery/likeGallery',
        payload: {
          gid: this.props.item.gid,
          path: this.props.location.pathname
        }
      });
    }
  };

  handleVisit = () => {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }
    this.props.dispatch(routerRedux.push({
      pathname: '/UserGallery',
      query:{
        uid: this.props.item.uid,
      }
    }));
  };

  render() {
    let likeType = this.props.item.isLiked?'heart':'heart-o';
    const item = this.props.item;
    return(
      <div className={styles.card}>
        <h3 className={styles.title}>{item.title}</h3>
        <img className={styles.img} src={item.pictures[0]} onClick={this.turnToDetail} />
        <div className={styles.userPart}>
          {
            this.props.location.pathname === '/MyGallery'||this.props.location.pathname === '/UserGallery'?
              null
              :
              <span className={styles.username} onClick={this.handleVisit}><a>{item.userName}</a></span>
          }
          <span className={styles.time}>{item.formatDate}</span>
          <span className={styles.like}><Icon type={likeType} className={styles.likeIcon} onClick={this.likeAction} />{item.likeNum}</span>
        </div>
      </div>
    )
  }
}

export default connect()(ImageCard);
