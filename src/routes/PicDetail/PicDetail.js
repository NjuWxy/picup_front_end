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
              <img style={{height: picHeight, width: 'auto'}} src={require('../../assets/cat.jpg')}/>
            </Col>
            <Col span={2}>
              <Icon className={styles.right} style={{marginTop: picHeight/2-50}} type="right" />
            </Col>
          </Row>
          <Row style={{marginTop: minHeight/10}}>
            <Col offset={11} span={2} className={styles.picIndex}>1/10</Col>
          </Row>
        </Col>
        <Col className={styles.rightPart} span={6} style={{minHeight: minHeight}}>
          <div className={styles.publisher}>
            <img className={styles.avatar} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
            <span className={styles.username}>shea</span>
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
            <span className={styles.tag}>#这里是</span>
            <span className={styles.tag}>#标签</span>
            <span className={styles.tag}>#栏</span>
          </div>
          <div className={styles.descriptionPart}>
            <h3 className={styles.title}>这是一个标题</h3>
            <p className={styles.description}>
              今年的秋天似乎有些漫长，都已经十一月份了依然不见雪花飘舞北风呼啸的冬日场景。
              在本月中旬的一天中午，原本晴朗的天空突然阴沉下来，紧接着又刮起了不紧不慢的西北风。
              只是奇怪一向狂暴的西北风何时变得这般柔和温顺，连校园中的柳树也只迎风轻轻摇晃着多情的柳枝，
              仿佛在轻歌曼舞、自娱自乐。地上的少许尚未完全褪尽绿意的落叶被微风拂过，或懒洋洋的翻了个身，
              或优雅的打了个旋，或一动不动。不多时西风渐紧，树枝的摆动幅度有所加大，一股带着湿意的微寒气流开始在小区上空旋转升腾扩散。
              到下午五、六点钟时先是随风飘来点点雨丝，渐渐地细小的雪花也粉墨登场了。
            </p>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect()(PicDetail);


