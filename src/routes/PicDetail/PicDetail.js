import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form,Input, Button, Row, Col, Icon } from 'antd';
import styles from './PicDetail.less';


class PicDetail extends React.Component {
  getWinHeight = () => {
    let minHeight = 0;
    if (window.innerHeight)
      minHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
      minHeight = document.body.clientHeight;
    return minHeight;
  };

  returnToHome = () => {
    this.props.dispatch(routerRedux.push({
      pathname: "/HotGallery"
    }))
  };

  render() {
    const {tags,pictures,title,username,avatar,description,picturesLen,tagsLen} = this.props.location.query;
    let tagSpans = [];
    if(tagsLen === "1"){
      tagSpans.push(<span className={styles.tag} key="0">#{tags}</span>)
    }else {
      for(let i=0;i<tags.length;i++){
        tagSpans.push(<span className={styles.tag} key={i}>#{tags[i]}</span>);
      }
    }
    let cover = picturesLen==="1" ? pictures : pictures[0];
    const minHeight = this.getWinHeight();
    const picHeight = minHeight/2;
    return(
      <Row className={styles.content} style={{minHeight: minHeight}}>
        <Col className={styles.leftPart} offset={1} span={17}>
          <Icon className={styles.close} type="close" onClick={this.returnToHome}/>
          <Icon className={styles.download} type="download" />
          <Row style={{minHeight: picHeight,marginTop: minHeight/6}}>
            <Col span={2}>
              <Icon className={styles.left} style={{marginTop: picHeight/2-50}} type="left" />
            </Col>
            <Col span={20} style={{textAlign: 'center'}}>
              <img style={{height: picHeight, width: 'auto'}} src={cover}/>
            </Col>
            <Col span={2}>
              <Icon className={styles.right} style={{marginTop: picHeight/2-50}} type="right" />
            </Col>
          </Row>
          <Row style={{marginTop: minHeight/10}}>
            <Col offset={11} span={2} className={styles.picIndex}>1/{picturesLen}</Col>
          </Row>
        </Col>
        <Col className={styles.rightPart} span={6} style={{minHeight: minHeight}}>
          <div className={styles.publisher}>
            <img className={styles.avatar} src={avatar}/>
            <span className={styles.username}>{username}</span>
            <Button className={styles.follow}>关注</Button>
          </div>
          <div>
            <div className={styles.info}>
              <Icon className={styles.like} type="heart-o"/>
              <span className={styles.likeNum}>23</span>
              <span className={styles.time}>11月13日</span>
            </div>
          </div>
          <div className={styles.tags} style={{minHeight: minHeight/8}}>
            {tagSpans}
          </div>
          <div className={styles.descriptionPart}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>
              {description}
            </p>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect()(PicDetail);


