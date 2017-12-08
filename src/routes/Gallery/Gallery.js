import React from 'react';
import { Row, Col, Menu } from 'antd';
import { connect } from 'dva';
import styles from './Gallery.less';
import MyLayout from '../../components/MyLayout/MyLayout';
import ImageCard from '../../components/Card/ImageCard/ImageCard';

function Gallery({ location, hotGallery }) {
  function handleClick(e) {
    console.log(e);
  }
  return(
    <MyLayout location={location}>
      <div className={styles.galleryPart}>
        {
          hotGallery.map((item,index) => {
            return(
              <ImageCard item={item} key={index} />
            )
          })
        }
      </div>
    </MyLayout>
  )
}

function mapStateToProps(state) {
  const { hotGallery } = state.pictures;
  console.log(hotGallery);
  return { hotGallery };
}

export default connect(mapStateToProps)(Gallery);
