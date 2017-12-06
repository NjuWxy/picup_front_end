import React from 'react';
import { Row, Col, Menu } from 'antd';
import { connect } from 'dva';
import styles from './Gallery.less';
import MyLayout from '../../components/MyLayout/MyLayout';
import ImageCard from '../../components/Card/ImageCard/ImageCard';

class Gallery extends React.Component{
  render() {
    return(
      <MyLayout location={this.props.location}>
        <Row className={styles.top}>
          <Col offset={8} span={10}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={['recommend']}
              mode="horizontal"
              className={styles.category}
            >
              <Menu.Item key="recommend" className={styles.menuItem}>推荐列表</Menu.Item>
              <Menu.Item key="latest" className={styles.menuItem}>最新发布</Menu.Item>
              <Menu.Item key="follow" className={styles.menuItem}>我的关注</Menu.Item>
            </Menu>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={22}>
            <div className={styles.galleryPart}>
              {
                this.props.hotGallery.map((item,index) => {
                  return(
                    <ImageCard item={item} key={index} />
                  )
                })
              }
            </div>
          </Col>
        </Row>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  const { hotGallery } = state.pictures;
  return { hotGallery };
}

export default connect(mapStateToProps)(Gallery);
