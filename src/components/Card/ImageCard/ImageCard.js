import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ImageCard.less';


function ImageCard({dispatch,item}) {
  /**
   * 跳转到分享详情
   */
  function turnToDetail() {
    dispatch(routerRedux.push({
      pathname: "/PicDetail",
      query: {
        id: "dgh"
      }
    }))
  }
  return(
    <div className={styles.card} onClick={turnToDetail}>
      <h3 className={styles.title}>{item.title}</h3>
      <img className={styles.img} src={location+'cat.jpg'}/>
      <div className={styles.userPart}>
        <span className={styles.username}>{item.username}</span>
        <span className={styles.time}>{item.time}</span>
        <span className={styles.like}><Icon type="heart-o" />{item.likeNum}</span>
      </div>
    </div>
  )
}

export default connect()(ImageCard);
