import React from 'react';
import { connect } from 'dva';
import { Row, Col, Upload, Icon, Form, Input, Tooltip, Select, Button, Tag  } from 'antd';
import styles from './Post.less';
import MyLayout from '../../components/MyLayout/MyLayout';
import { getUid } from '../../utils/tools';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostForm extends React.Component {
  state = {
    /**
     * 选择专辑的选定值, 每个用户有一个默认专辑，初选为默认专辑
     */
    selectValue:'',
    /**
     * 本次动态的标签列表，最多可以有六个标签
     */
    tags: [],
    /**
     * 添加标签的输入框是否可见，为false时不可见而按钮可见
     */
    inputVisible: false,
    /**
     * 添加标签的输入值
     */
    inputValue: '',
    /**
     * 用户上传的图片文件列表 todo
     */
    fileList: [],
  };

  /**
   * 上传图片、删除图片时改变state中的fileList
   * @param fileList
   */
  handleChange = ({ fileList }) => this.setState({ fileList });


  /**
   * 移除标签时，要移除state中tags中的标签
   * @param removedTag 被移除的标签
   */
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  /**
   * 点击+标签之后，+标签的位置变为一个input组件，即让input组件显现出来，并且获得焦点
   */
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  /**
   * 添加标签的输入变化时，改变this.state.inputValue
   * @param e
   */
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  /**
   * 当添加标签的输入框失去焦点或者用户在此输入框输入回车时，代表用户已经添加新标签完成，此时应：
   * 1.将添加标签的输入框的值置为''，并让输入框不可见按钮可见（即inputVisible: false）
   * 2.将该标签加入this.state.tags
   */
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };


  saveInputRef = input => this.input = input;


  /**
   *  更改selectValue（选择专辑的选定值）
   * @param value 选择专辑的选定值
   */
  handleAlbumSelect = (value) => {
    console.log("selectValue:"+value);
    this.setState({selectValue: value});
  };

  /**
   * 提交大片儿秀
   * @param e
   */
  handleSubmit = (e) => {
    console.log("submitPhot");
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //fileNames,title,description, tags, albumId, uid
        const fileNames = this.state.fileList.map((file)=>file.name);
        const albumId = this.state.selectValue;
        this.props.dispatch({
          type: 'photo/post',
          payload: {
            fileNames,
            title: values.title,
            description: values.description,
            tags: this.state.tags,
            albumId,
            uid: getUid()
          }
        });
        console.log(this.state.fileList);
      }
    });
  };

  render() {
    const { fileList, tags, inputVisible, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <MyLayout location={this.props.location}>
        <Row>
          <Col offset={4} span={16} className={styles.content}>
            <Row>
              <Col span={18}>
                <div className={styles.picturePart}>
                  <Upload
                    action="/api/photo/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={this.handleChange}
                  >
                    {
                      fileList.length >= 9 ?
                        null
                        :
                        <div>
                          <Icon type="plus"/>
                          <div className="ant-upload-text">Upload</div>
                        </div>
                    }
                  </Upload>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.infoPart}>
                  <Form onSubmit={this.handleSubmit}>
                    <h3 className={styles.label}>同时添加到相册</h3>
                    <FormItem>
                      {getFieldDecorator('album',{
                        rules: [
                          { required: true, message: '相册不能为空!' }],
                      })(
                        <Select
                          style={{ width: '100%' }}
                          placeholder="请选择相册"
                          onChange={this.handleAlbumSelect}
                          value={this.state.selectValue}
                          dropdownStyle={{maxHeight: 100, overflow: 'auto'}}
                        >
                          {this.props.albums.map((album) => {
                            return(<Option key={album.aid}>{album.title}</Option>)
                          })}
                        </Select>
                      )}
                    </FormItem>
                    <h3 className={styles.label}>标题</h3>
                    <FormItem>
                      {getFieldDecorator('title',{
                        rules: [
                          { required: true, message: '标题不能为空!' }],
                      },{initialValue:""})(
                        <Input />
                      )}
                    </FormItem>
                    <h3 className={styles.label}>描述</h3>
                    <FormItem>
                      {getFieldDecorator('description',{
                        rules: [
                          { required: true, message: '描述不能为空!' }],
                      },{initialValue:""})(
                        <TextArea rows={4} />
                      )}
                    </FormItem>
                    <h3 className={styles.label}>标签</h3>
                    <FormItem>
                      {getFieldDecorator('tag')(
                        <div>
                          <div>
                            {tags.map((tag) => {
                              const isLongTag = tag.length > 20;
                              const tagElem = (
                                <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                              );
                              return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                              <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                              />
                            )}
                            {!inputVisible &&(tags.length>=6?null: <Button size="small" type="dashed" onClick={this.showInput}>+ 标签</Button>)}
                          </div>
                        </div>
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" className={styles.submit}>发布</Button>
                    </FormItem>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

const Post = Form.create()(PostForm);

function mapStateToProps(state) {
  const { albums } = state.album;
  return{ albums }
}

export default connect(mapStateToProps)(Post);

