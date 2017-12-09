import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as photoService from '../services/photoService';
export default {

  namespace: 'photo',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname, query }) => {
      })
    },
  },

  effects: {
    * post({ payload: { fileNames,title,description, tags, albumId, uid}},{call,put}){
      const result = yield call(photoService.post,fileNames,title,description, tags, albumId, uid);
      if(result!=="SUCCESS"){
        message.error("woops,发布失败");
      }else {
        yield put(routerRedux.push({
          pathname:'/HotGallery'
        }))
      }
    },

  },

  reducers: {

  },

};


