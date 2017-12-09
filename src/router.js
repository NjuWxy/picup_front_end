import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Gallery from './routes/Gallery/Gallery';
import Follow from './routes/Personal/Follow/Follow';
import ChangePsw from './routes/Personal/PersonSetting/PersonSetting';
import PicDetail  from './routes/PicDetail/PicDetail';
import Album from './routes/Album/Album';
import Login from './routes/Login/Login';
import Post from './routes/Post/Post';
import AlbumDetail from './routes/Album/AlbumDetail';

function RouterConfig({ hashHistory }) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="/HotGallery" component={Gallery} />
      <Route path="/LatestGallery" component={Gallery} />
      <Route path="/InterestGallery" component={Gallery} />
      <Route path="/SearchGallery" component={Gallery} />
      <Route path="/PicDetail" component={PicDetail} />
      <Route path="/FollowManage" component={Follow}/>
      <Route path="/PersonSetting" component={ChangePsw}/>
      <Route path="/Album" component={Album} />
      <Route path="/AlbumDetail" component={AlbumDetail} />
      <Route path="/Login" component={Login} />
      <Route path="/Post" component={Post}/>
    </Router>
  );
}

export default RouterConfig;
