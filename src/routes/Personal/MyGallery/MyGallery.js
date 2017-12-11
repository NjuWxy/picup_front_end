import React from 'react';
import { connect } from 'dva';
import { Form,Input, Button,Icon, Row, Col } from 'antd';
import styles from './MyGallery.less';
import MyLayout from '../../../components/MyLayout/MyLayout';
import Nav from '../../../components/Nav/Personal/Nav';
import ImageCard from '../../../components/Card/ImageCard/ImageCard';
import HomePageHeader from '../../../components/HomePageHeader/HomePageHeader';


function MyGallery({ dispatch, location, gallery }) {
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
      <HomePageHeader location={location} />
      {
        location.pathname === '/MyGallery'?
          <Nav location={location} />:null
      }
      <Row className={styles.content}>
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
      </Row>
    </MyLayout>
  )
}

function mapStateToProps(state) {
  const { gallery }  = state.gallery;
  return { gallery };
}


export default connect(mapStateToProps)(MyGallery);

