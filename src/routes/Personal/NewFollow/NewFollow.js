import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './NewFollow.less';
import MyLayout from '../../../components/MyLayout/MyLayout';

class Follow extends React.Component{

  state = {
    isCreateAlbumButton: true,
    createAlbumValue: '',
  };


  delAlbum = (aid) => {
    this.props.dispatch({
      type: 'album/deleteAlbum',
      payload: {
        aid
      }
    })
  };

  createAlbum = () => {
    this.setState({
      isCreateAlbumButton: false
    })
  };

  handleInputChange = (e) => {
    this.setState({
      createAlbumValue: e.target.value
    })
  };

  confirmCreate = () => {
    this.props.dispatch({
      type: 'album/createAlbum',
      payload: {
        album: this.state.createAlbumValue,
      }
    });
    this.setState({
      isCreateAlbumButton: true,
      createAlbumValue: '',
    })
  };

  render(){
    const albumCards = this.props.albums.map((album) => {
      return(
        <div className={styles.card} key={album.aid}>
          <h2 className={styles.title}>{album.title}</h2>
          {
            album.photos.length === 0?
              <img className={styles.img} src={require('../../assets/defaultAlbumCover.jpg')} />
              :
              <img className={styles.img} src={album.photos[0]} />
          }
          <div className={styles.bottom}>
            {
              album.title === '默认相册'?
                null
                :
                <Button
                  className={styles.del}
                  onClick={
                    () => {
                      this.delAlbum(album.aid);
                    }
                  }
                >
                  删除
                </Button>
            }
          </div>
        </div>
      )
    });
    return(
      <MyLayout>
        <Row className={styles.content}>
          <Col offset={2} span={20}>
            {
              this.state.isCreateAlbumButton?
                <Button className={styles.createAlbum} onClick={this.createAlbum}>
                  创建相册
                </Button>
                :
                <Input
                  value={this.state.createAlbumValue}
                  className={styles.createAlbumInput}
                  onBlur={this.confirmCreate}
                  onPressEnter={this.confirmCreate}
                  onChange={this.handleInputChange}
                />

            }
          </Col>
        </Row>
        <Row className={styles.content}>
          <Col offset={2} span={20}>
            {albumCards}
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  const { followedUser } = state.users;
  return { followedUser };
}


export default connect(mapStateToProps)(Follow);

