import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as pictureService from '../services/pictureService';
export default {

  namespace: 'pictures',

  state: {
    hotGallery: [],
    albums: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/HotGallery') {
          dispatch({
            type: 'getHotGallery',
          });
        }else if(pathname === '/Album') {
          dispatch({
            type: 'getAlbum',
          })
        }
      });
    },
  },

  effects: {
    *getHotGallery({ payload }, { call, put }) {  // eslint-disable-line
      const hotGallery = yield call(pictureService.getHotGallery);
      yield put(
        {
          type: 'saveHotGallery',
          payload: { hotGallery }
        });
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
  },

};

