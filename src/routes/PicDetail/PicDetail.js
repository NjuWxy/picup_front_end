import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form,Input, Button, Row, Col, Icon } from 'antd';
import styles from './PicDetail.less';


class PicDetail extends React.Component {
  // getWinHeight = () => {
  //   let minHeight = 0;
  //   if (window.innerHeight)
  //     minHeight = window.innerHeight;
  //   else if ((document.body) && (document.body.clientHeight))
  //     minHeight = document.body.clientHeight;
  //   return minHeight;
  // };

  returnToHome = () => {
    // this.props.dispatch({
    //   type: 'pictures/saveDetail',
    //   payload: { pictureDetail: {} },
    // });
    // this.props.dispatch(routerRedux.push({
    //   pathname: "/HotGallery"
    // }))
  };

  render() {
    const item = {
      gid,
      username: '高岳',
      avatar: "http://localhost:8080/picture/1512711829658dog1.jpg",
      pictures: [
        "http://localhost:8080/picture/1512711829658dog1.jpg"
      ],
      title: 'ok',
      description: 'ok',
      likeNum: 2,
      formatDate: '2017-10-10',
      tags: ['pet','cat']
    };
    const cover = item.pictures[0];
    const minHeight = 720;
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
            <Col offset={11} span={2} className={styles.picIndex}>1/{item.pictures.length}</Col>
          </Row>
        </Col>
        <Col className={styles.rightPart} span={6} style={{minHeight: minHeight}}>
          <div className={styles.publisher}>
            <img className={styles.avatar} src={item.avatar}/>
            <span className={styles.username}>{item.userName}</span>
            <Button className={styles.follow}>关注</Button>
          </div>
          <div>
            <div className={styles.info}>
              <Icon className={styles.like} type="heart-o"/>
              <span className={styles.likeNum}>{item.likeNum}</span>
              <span className={styles.time}>{item.formatDate}</span>
            </div>
          </div>
          <div className={styles.tags} style={{minHeight: minHeight/8}}>
            {
              item.tags.map((tag,index) => {
                return <span key={index} className={styles.tag}>{tag}</span>
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
  const { detail } = state.pictures;
  // console.log(detail);
  return { detail };
}

export default connect()(PicDetail);


