import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as albumService from '../services/albumService';

export default {
  namespace: 'album',
  state: {
    albums: [],
    detail: {
      aid: '',
      title: '',
      uid: '',
      photos: [],
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query })=> {
        if(pathname === '/Post' || pathname === '/Album') {
          dispatch({
            type:'getAlbums'
          });
        }else if(pathname === '/AlbumDetail') {
          dispatch({
            type: 'getAlbumDetail',
            payload: { aid: query.aid }
          })
        }
      });
    }
  },

  effects: {
    * getAlbums({ payload }, { call, put }){
      const result = yield call(albumService.getAlbums);
      console.log(result);
      if(result === "FAILURE"){
        message.error("获得相册失败");
      }else {
        yield put({
          type: 'saveAlbum',
          payload: { albums: result }
        })
      }
    },

    *createAlbum({ payload: { album }}, { call, put }){
      const result = yield call(albumService.createAlbum, album);
      if(result !== "SUCCESS"){
        message.error("创建新相册失败");
      }else {
        yield put(routerRedux.push({
          pathname: '/Album'
        }))
      }
    },

    *deleteAlbum({ payload: { aid }}, { call, put }){
      const result = yield call(albumService.deleteAlbum, aid);
      if(result !== "SUCCESS"){
        message.error("删除相册失败");
      }else {
        yield put(routerRedux.push({
          pathname: '/Album'
        }))
      }
    },

    * getAlbumDetail({ payload: { aid }}, {call,put}) {
      const detail = yield call(albumService.getAlbumDetail, aid);
      yield put(
        {
          type: 'saveDetail',
          payload: { detail },
        }
      );
    }


  },

  reducers: {
    saveAlbum(state,{payload:{ albums }}){
      return{...state,albums };
    },
    saveDetail(state, { payload: { detail }}) {
      return{ ...state, detail };
    }
  }
};

