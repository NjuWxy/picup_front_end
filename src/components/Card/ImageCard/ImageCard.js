import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ImageCard.less';


class ImageCard extends React.Component{
  /**
   * 跳转到分享详情
   */
  turnToDetail = () => {
    console.log('ttd');
    this.props.dispatch(routerRedux.push({
      pathname: '/PicDetail',
      query: { gid: this.props.item.gid }
    }));
  };
  render(){

    return(
      <div className={styles.card} onClick={this.turnToDetail}>
        <h3 className={styles.title}>{this.props.item.title}</h3>
        <img className={styles.img} src={this.props.item.pictures[0]}/>
        <div className={styles.userPart}>
          <span className={styles.username}>{this.props.item.userName}</span>
          <span className={styles.time}>{this.props.item.formatDate}</span>
          <span className={styles.like}><Icon type="heart-o" />{this.props.item.likeNum}</span>
        </div>
      </div>
    )
  }
}

export default connect()(ImageCard);
