import React from 'react';
import { Row, Col, Menu } from 'antd';
import { connect } from 'dva';
import styles from './Gallery.less';
import MyLayout from '../../components/MyLayout/MyLayout';
import ImageCard from '../../components/Card/ImageCard/ImageCard';
import Nav from '../../components/Nav/Gallery/Nav';

function Gallery({ location, gallery }) {
  return(
    <MyLayout location={location}>
      <Nav location={location}/>
      <Row className={styles.galleryPart}>
        <Col offset={1} span={22}>
          {
            gallery.map((item,index) => {
              return(
                <ImageCard item={item} key={index} location={location} />
              )
            })
          }
        </Col>
      </Row>
    </MyLayout>
  )
}

function mapStateToProps(state) {
  const { gallery } = state.gallery;
  return { gallery };
}

export default connect(mapStateToProps)(Gallery);
