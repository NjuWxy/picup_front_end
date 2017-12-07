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
    console.log(item.title+"===title");
    console.log(item.pictures);
    dispatch(routerRedux.push({
      pathname: "/PicDetail",
      query: {
        title: item.title,
        pictures: item.pictures,
        description: item.description,
        tags: item.tags,
        username: item.userName,
        avatar: item.avatar,
        picturesLen: item.pictures.length,
        tagsLen : item.tags.length,
      }
    }))
  }
  return(
    <div className={styles.card} onClick={turnToDetail}>
      <h3 className={styles.title}>{item.title}</h3>
      <img className={styles.img} src={item.pictures[0]}/>
      <div className={styles.userPart}>
        <span className={styles.username}>{item.userName}</span>
        <span className={styles.time}>{item.formatDate}</span>
        <span className={styles.like}><Icon type="heart-o" />{item.likeNum}</span>
      </div>
    </div>
  )
}

export default connect()(ImageCard);
