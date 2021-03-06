import React from 'react';
import { Row, Col, Menu } from 'antd';
import { connect } from 'dva';
import styles from './Gallery.less';
import MyLayout from '../../components/MyLayout/MyLayout';
import ImageCard from '../../components/Card/ImageCard/ImageCard';
import Nav from '../../components/Nav/Gallery/Nav';

function Gallery({ location, gallery }) {
  console.log(gallery);
  let column1 = [];
  let column2 = [];
  let column3 = [];
  let column4 = [];
  for(let i=0;i<gallery.length;i++){
    if(i%4 === 0){
      column1.push(<ImageCard item={gallery[i]} key={i} location={location} />);
    }else if(i%4 === 1){
      column2.push(<ImageCard item={gallery[i]} key={i} location={location} />);
    }else if(i%4 === 4){
      column3.push(<ImageCard item={gallery[i]} key={i} location={location} />);
    } else {
      column4.push(<ImageCard item={gallery[i]} key={i} location={location} />);
    }
  }

  return(
    <MyLayout location={location}>
      <Nav location={location}/>
      <div className={styles.galleryPart}>
        <Row type="flex" justify="space-between" align="top">
          <Col span={22} offset={1}>
            <Row type="flex" justify="space-between" align="top" >
              <Col span={6}>
                {column1}
              </Col>
              <Col span={6}>
                {column2}
              </Col>
              <Col span={6}>
                {column3}
              </Col>
              <Col span={6}>
                {column4}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </MyLayout>
  )
}

function mapStateToProps(state) {
  const { gallery } = state.gallery;
  return { gallery };
}

export default connect(mapStateToProps)(Gallery);
