import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form,Input, Button, Row, Col, Icon, message } from 'antd';
import styles from './AlbumDetail.less';
import { getWinHeight, isLogin } from '../../utils/tools';



class AlbumDetail extends React.Component {
  state = {
    pointer: 0,
  };

  returnToHome = () => {
    this.props.dispatch(routerRedux.goBack());
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
    if(this.state.pointer === this.props.detail.photos.length-1){
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
    const presentPic = this.props.detail.photos[this.state.pointer];
    const minHeight = getWinHeight();
    const picHeight = minHeight/2;
    return(
      <Row className={styles.content} style={{minHeight: minHeight}}>
        <Col className={styles.leftPart} offset={1} span={22}>
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
            <Col offset={11} span={2} className={styles.picIndex}>{this.state.pointer+1}/{item.photos.length}</Col>
          </Row>
        </Col>
      </Row>
    )
  }
}



function mapStateToProps(state) {
  const { detail } = state.album;
  return { detail };
}

export default connect(mapStateToProps)(AlbumDetail);



