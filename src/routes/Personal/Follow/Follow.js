import React from 'react';
import { Button, Table, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './Follow.less';
import MyLayout from '../../../components/MyLayout/MyLayout';
import Nav from '../../../components/Nav/Personal/Nav';



class Follow extends React.Component {
  state = {
    selectedKeys: []
  };

  cancelFollow = () => {
    this.props.dispatch({
      type: 'followManage/cancelFollow',
      payload: {
        memberEmails: this.state.selectedKeys
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
    }, {
      title: 'email',
      dataIndex: 'email',
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedKeys: selectedRowKeys
        });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };
    return(
      <MyLayout>
        <Nav location={this.props.location} />
        <Row className={styles.content}>
          <Col offset={4} span={16}>
            <Button className={styles.cancelFollow} onClick={this.cancelFollow}>取消关注</Button>
          </Col>
        </Row>
        <Row className={styles.tablePart}>
          <Col offset={4} span={16}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.follows} />
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  const { follows } = state.followManage;
  console.log(follows);
  return { follows };
}

export default connect(mapStateToProps)(Follow);

