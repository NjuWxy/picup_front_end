import React from 'react';
import { Row, Col, Checkbox, Button, Modal, Select } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './GroupPane.less';

const Option = Select.Option;

/**
 * props:
 */
class GroupPane extends React.Component {
  constructor(props){
    super(props);
    let members = this.setMembers(props.group.groupMember);
    this.state = {
      checkedValues: [],
      members,
      showMoveModal: false,
      moveToGroupID: props.group.groupID,
    }
  }

  /**
   * 返回更新后的组件list
   * @param groupMember props中的member数据
   */
  setMembers = (groupMember) => {
    return groupMember.map((member,index)=>{
      return(
        <Col span={8} key={index}>
          <Checkbox className={styles.checkBox} value={member.email} />
          <img className={styles.avatar} src={member.avatarUrl}/>
          <div className={styles.username}>{member.username}</div>
        </Col>
      )
    });
  };

  /**
   * 用户选择一个关注人之后将之记录在state.checkedValues
   * @param checkedValues
   */
  handleCheck = (checkedValues) => {
    this.setState({
      checkedValues
    });
    console.log(checkedValues);
  };

  /**
   * 用户点击移动按钮之后，显示选择分组的对话框
   */
  showMoveModal = () => {
    this.setState({
      showMoveModal: true,
      moveToGroupID: this.props.group.groupID
    });
  };

  /**
   * 取消移动
   */
  hideMoveModal = () => {
    this.setState({
      showMoveModal: false,
    });
  };

  /**
   * @param value 用户从选择器选择的移入的分组名，将被存入state
   */
  handleGroupSelect = (value) => {
    console.log(value);
    this.setState({
      moveToGroupID:value
    });
  };

  /**
   * 将记录在state.checkedValues中的关注人移动到指定分组（moveToGroupID），并重新获取follows，更新组件list
   */
  finishMove = () => {
    this.props.dispatch({
      type: 'followManage/moveMembers',
      payload: {
        from: this.props.group.groupID,
        to: this.state.moveToGroupID,
        memberEmails:this.state.checkedValues
      }
    });
    this.updateMemberComponent();
    this.hideMoveModal();
  };

  /**
   * 用户点击删除按钮之后，将记录在state.checkedValues中的关注人删除，并重新获取follows，更新组件list
   */
  handleDel = () => {
    this.props.dispatch({
      type: 'followManage/delMembers',
      payload: {
        groupID: this.props.group.groupID,
        memberEmails: this.state.checkedValues
      }
    });
    this.updateMemberComponent();
  };

  /**
   * 重新获取follows，更新组件list
   */
  updateMemberComponent = () => {
    this.props.dispatch({
      type: 'followManage/getFollows',
    });
    const newMembers = this.setMembers(this.props.group.groupMember);
    this.setState({
      members: newMembers,
      checkedValues: []
    });
  };


  render() {
    return(
      <div className={styles.groupPane}>
        <Checkbox.Group className={styles.checkBoxes} onChange={this.handleCheck}>
          <Row>
            {
              this.state.members
            }
          </Row>
        </Checkbox.Group>
        <div className={styles.actions}>
          <Button className={styles.move} onClick={this.showMoveModal}>移动</Button>
          <Button className={styles.del} onClick={this.handleDel}>删除</Button>
        </div>
        <Modal
          visible={this.state.showMoveModal}
          onCancel={this.hideMoveModal}
          onOk={this.finishMove}
          title=""
        >
          <Select
            style={{ width: '80%' }}
            placeholder="请选择分组"
            onChange={this.handleGroupSelect}
            value={this.state.moveToGroupID}
            dropdownStyle={{maxHeight: 100, overflow: 'auto'}}
          >
            {this.props.groupIDs.map((groupID) => {
              return(
                <Option key={groupID}>{groupID}</Option>
              );
            })}
          </Select>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { follows }  = state.followManage;
  let groupIDs = [];
  for(let i=0;i<follows.length;i++){
    groupIDs.push(follows[i].groupID);
  }
  return { groupIDs };
}

export default connect(mapStateToProps)(GroupPane);


