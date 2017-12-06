import React from 'react';
import { Tabs, Button, Input, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './FollowManage.less';
import MyLayout from '../../../components/MyLayout/MyLayout';
import Nav from '../../../components/Nav/Personal/Nav';
import GroupPane from '../../../components/FollowManage/GroupPane';

const TabPane = Tabs.TabPane;

class FollowManage extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: this.props.follows[0].groupID,
      isAddButton: true,
    };
  }

  finishAdd = (e) => {
    //get input
    const groupName = e.target.value;
    //add group
    this.props.dispatch({
      type: 'followManage/addGroup',
      payload: {groupName},
    });
    //reget followList
    this.props.dispatch({
      type: 'followManage/getFollows',
    });
    //change input into button
    this.setState({
      isAddButton:true,
    });
  };

  cancelAdd = () => {
    this.setState({
      isAddButton: true
    });
  };

  beginAdd = () => {
    this.setState({
      isAddButton: false
    });
  };

  handleChangeTab = () => {
    this.props.dispatch({
      type: 'followManage/getFollows',
    });
  };

  render() {
    const operations =
      !this.state.isAddButton
        ?
        <Input className={styles.addInput} placeholder="输入分组名" onPressEnter={this.finishAdd} onBlur={this.cancelAdd}/>
        :
        <Button className={styles.addButton} onClick={this.beginAdd}>添加分组</Button>;
    return(
      <MyLayout>
        <Nav location={this.props.location} />
        <div className={styles.content}>
          <Tabs
            tabBarExtraContent={operations}
            tabPosition="left"
            tabBarStyle={{minHeight: 660, position: 'relative'}}
            onChange={this.handleChangeTab}
          >
            {this.props.follows.map((group,index)=>{
              return <TabPane tab={group.groupID} key={index}><GroupPane group={group}/></TabPane>
            })}
          </Tabs>
        </div>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
   const { follows } = state.followManage;
   return { follows };
}

export default connect(mapStateToProps)(FollowManage);
