import React from 'react';
import { Button, Table, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './Follow.less';
import MyLayout from '../../../components/MyLayout/MyLayout';
import Nav from '../../../components/Nav/Personal/Nav';



class Follow extends React.Component {
  state = {
    selectedRows: []
  };

  cancelFollow = () => {
    this.props.dispatch({
      type: 'users/unfollowUserList',
      payload: {
        followedUsernameList: this.state.selectedRows
      }
    });
  };

  render() {
    const columns = [{
      title: '头像',
      dataIndex: 'avatarUrl',
      render: url => <img className={styles.avatar} src={url} />,
    }, {
      title: '昵称',
      dataIndex: 'username',
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows: selectedRows.map(row => row.key),
        });
      }
    };
    return(
      <MyLayout>
        <Nav location={this.props.location} />
        <Row>
          <Col offset={8} span={8} className={styles.content}>
            <Row>
              <Col offset={4} span={16}>
                <Button className={styles.cancelFollow} onClick={this.cancelFollow}>取消关注</Button>
              </Col>
            </Row>
            <Row>
              <Col offset={4} span={16} className={styles.tablePart}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.follows} />
              </Col>
            </Row>
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  const { followedUser } = state.users;
  const follows = [];
  followedUser.map((user) => {
    follows.push(
      {key: user.username,
        username: user.username,
        avatarUrl: user.avatar
      })
  });
  return { follows };
}

export default connect(mapStateToProps)(Follow);

