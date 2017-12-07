import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';
import styles from './Album.less';
import MyLayout from '../../components/MyLayout/MyLayout';

class Album extends React.Component{
  delAlbum = (albumID) => {
    this.props.dispatch({
      type: 'pictures/delAlbum',
      payload: {
        albumID
      }
    })
  };

  render(){
    const albumCards = this.props.albums.map((album) => {
      return(
        <div className={styles.card} key={album.aid}>
          <h1 className={styles.title}>{album.name}</h1>
          <img className={styles.img} src={require('../../assets/yay.jpg')} />
          <div className={styles.bottom}>
            <span className={styles.time}>{album.date}</span>
            <Button
              className={styles.del}
              onClick={
                () => {
                  this.delAlbum(album.aid);
                }
              }
              key={album.name}
            >
              删除
            </Button>
          </div>
        </div>
      )
    });
    return(
      <MyLayout>
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
  const { albums } = state.pictures;
  return { albums };
}

export default connect(mapStateToProps)(Album);
