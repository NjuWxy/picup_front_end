/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Table, Avatar, Tabs } from 'antd';
import MyLayout from '../../../components/MyLayout/MyLayout';
import styles from './MyMessage.less';
import HomePageHeader from '../../../components/HomePageHeader/HomePageHeader';
import Nav from '../../../components/Nav/Personal/Nav';

const TabPane = Tabs.TabPane;



class MyMessage extends React.Component {

  handleVisit = (uid) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/UserGallery',
      query:{
        uid
      }
    }));
  };

  render() {

    return (
      <MyLayout location={this.props.location}>
        <HomePageHeader location={this.props.location} />
        <Nav location={this.props.location}/>
        <Row>
          <Col span={14} offset={5} className={styles.content}>
            <Tabs defaultActiveKey="New" tabPosition="left">
              <TabPane tab="未读消息" key="New" style={{marginLeft: 80}}>
                {
                  this.props.newMessages.map((message,index) => {
                    return <div className={styles.message} key={index}>
                      <img className={styles.avatar} src={message.avatar} />
                      <div className={styles.messageMaker} onClick={()=>{this.handleVisit(message.uid)}}>@{message.username}</div>
                      <div className={styles.text}>{message.text}</div>
                      <div className={styles.date}>{message.formatDate}</div>
                    </div>;
                  })
                }
              </TabPane>
              <TabPane tab="已读消息" key="Old" style={{marginLeft: 80}}>
                {
                  this.props.oldMessages.map((message,index) => {
                    return <div className={styles.message} key={index}>
                      <img className={styles.avatar} src={message.avatar} />
                      <div className={styles.messageMaker} onClick={()=>{this.handleVisit(message.uid)}}>@{message.username}</div>
                      <div className={styles.text}>{message.text}</div>
                      <div className={styles.date}>{message.formatDate}</div>
                    </div>;
                  })
                }
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  const { messages } = state.users;
  let newMessages = [];
  let oldMessages = [];
  messages.map((message) => {
    if(message.isRead){
      oldMessages.push(message);
    }else {
      newMessages.push(message);
    }
  });
  return { newMessages, oldMessages };
}


export default connect(mapStateToProps)(MyMessage);

