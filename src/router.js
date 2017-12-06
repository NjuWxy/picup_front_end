import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Gallery from './routes/Gallery/Gallery';
import Follow from './routes/Personal/Follow/Follow';
import ChangePsw from './routes/Personal/ChangePsw/ChangePsw';
import PicDetail  from './routes/PicDetail/PicDetail';
import Album from './routes/Album/Album';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/HotGallery" component={Gallery} />
      <Route path="/FollowManage" component={Follow}/>
      <Route path="/ChangePsw" component={ChangePsw}/>
      <Route path="/PicDetail" component={PicDetail} />
      <Route path="/Album" component={Album} />
    </Router>
  );
}

export default RouterConfig;
