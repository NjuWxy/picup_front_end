import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as pictureService from '../services/pictureService';
export default {

  namespace: 'pictures',

  state: {
    hotGallery: [],
    albums: [],
    detail: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if(pathname === '/PicDetail'){
          dispatch({
            type: 'saveDetail',
            payload: {
              gid: query.gid,
            }
          })
        }
        if (pathname === '/HotGallery') {
          const username = "";
          dispatch({
            type: 'getHotGallery',
            payload: {
              username,
              pageNum: 0,
            }
          });
        }
        // else if(pathname === '/Album') {
        //   dispatch({
        //     type: 'getAlbum',
        //   })
        // }
      });
    },
  },

  effects: {
    * post({ payload: { fileNames,title,description, tags, albumId, uid}},{call,put}){
      const result = yield call(pictureService.post,fileNames,title,description, tags, albumId, uid);
      if(result!=="SUCCESS"){
        message.error("woops,发布失败");
      }else {
        yield put(routerRedux.push({
          pathname:'/HotGallery'
        }))
      }
    },
    *getHotGallery({ payload:{username="",pageNum=0} }, { call, put }) {  // eslint-disable-line
      const hotGallery = yield call(pictureService.getHotGallery,username,pageNum);
      yield put(
        {
          type: 'saveHotGallery',
          payload: { hotGallery }
        });
    },
    *saveDetail({ payload: { gid }}, { call, put }) {
      const detail = yield call(pictureService.getGalleryDetail, gid);
      yield put(
        {
          type: 'saveDetail',
          payload: { detail },
        }
      );
    },
    *getAlbum({ payload },{call,put}){
      const albums = yield call(pictureService.getAlbums);
      yield put({
        type: 'saveAlbums',
        payload:{ albums }
      });
    },
    *delAlbum({ payload: { albumID } },{call,put}){
      const result = yield call(pictureService.delAlbum, albumID);
      if(!result){
        message.error("删除失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname: '/Album'
        }));
      }
    }
  },

  reducers: {
    saveHotGallery(state, { payload: { hotGallery }}) {

      return { ...state, hotGallery };
    },
    saveAlbums(state, { payload: { albums }}) {
      return { ...state, albums };
    },
    saveDetail(state, { payload: { detail }}) {
      return { ...state, detail };
    },
  },

};

