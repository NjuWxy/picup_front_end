import React from 'react';
import { connect } from 'dva'
import { Form,Input, Button,Icon, Row, Col, Upload, message } from 'antd';
import styles from './ChangeAvatarForm.less';


class ChangeAvatarForm extends React.Component {

  state = {
    fileList: [],
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleSubmit = () => {
    if(this.state.fileList.length === 0){
      message.error("您没有做任何更新");
      return;
    }else {
      this.props.dispatch({
        type: 'users/postAvatar',
        payload: {
          avatarFileName: this.state.fileList[0].name,
        }
      });
    }
  };

  render() {
    return(
      <div className={styles.content}>
        <div className={styles.upload}>
          <h2 className={styles.header}>修改头像</h2>
          <Upload
            action="/api/user/upload"
            listType="picture-card"
            fileList={this.state.fileList}
            onChange={this.handleChange}
          >
            {
              this.state.fileList.length >= 1 ?
                null
                :
                <div>
                  <Icon type="plus"/>
                  <div className="ant-upload-text">上传头像</div>
                </div>
            }
          </Upload>
          <Button onClick={this.handleSubmit} className={styles.button} type="primary">提交</Button>
        </div>
      </div>
    )
  }
}

export default connect()(ChangeAvatarForm)
