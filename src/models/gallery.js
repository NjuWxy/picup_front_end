import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as galleryService from '../services/galleryService';
import * as userService from '../services/userService';
export default {

  namespace: 'gallery',

  state: {
    gallery: [],
    detail: {
      gid: '',
      title: '',
      aid: '',
      description: '',
      date: '',
      likeNum: '',
      uid: '',
      isLiked: false,
      tags: [],
      pictures: [],
      userName: '',
      avatar: '',
      isFollowed: false,
      formatDate: '',
    },
    visitedUser: {
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if( pathname === '/PicDetail') {
          dispatch({
            type: 'getDetail',
            payload: {
              gid: query.gid,
            }
          })
        }
        if (pathname === '/HotGallery') {
          dispatch({
            type: 'getHotGallery',
            payload: {
              pageNum: 0,
            }
          });
        }else if( pathname === '/LatestGallery') {
          dispatch({
            type: 'getLatestGallery',
            payload: {
              pageNum: 0
            }
          })
        }else if( pathname === '/InterestGallery') {
          dispatch({
            type: 'getInterestGallery',
          })
        }else if( pathname === '/SearchGallery') {
          dispatch({
            type: 'searchGallery',
            payload: { tag: query.tag }
          })
        }else if( pathname === '/MyGallery'){
          dispatch({
            type: 'getMyGallery',
          })
        }else if( pathname === '/UserGallery') {
          dispatch({
            type: 'getUserGallery',
            payload: { uid: query.uid },
          })
        }
      });
    },
  },

  effects: {
    *getHotGallery({ payload:{ pageNum } }, { call, put }) {  // eslint-disable-line
      const gallery = yield call(galleryService.getHotGallery,pageNum);
      yield put(
        {
          type: 'saveGallery',
          payload: { gallery }
        });
    },
    *getLatestGallery({ payload:{ pageNum } }, { call, put }) {  // eslint-disable-line
      const gallery = yield call(galleryService.getLatestGallery,pageNum);
      yield put(
        {
          type: 'saveGallery',
          payload: { gallery }
        });
    },
    *getInterestGallery({ payload }, { call, put }) {  // eslint-disable-line
      const gallery = yield call(galleryService.getInterestGallery);
      console.log(gallery);
      yield put(
        {
          type: 'saveGallery',
          payload: { gallery }
        });
    },
    *searchGallery({ payload:{ tag } }, { call, put }) {  // eslint-disable-line
      const gallery = yield call(galleryService.searchGallery,tag);
      yield put(
        {
          type: 'saveGallery',
          payload: { gallery }
        });
    },
    /**
     *用户访问自己的主页
     */
      * getMyGallery({ payload },{ call, put }){
      const gallery = yield call(galleryService.getMyGallery);
      console.log(gallery);
      yield put(
        {
          type: 'saveGallery',
          payload: { gallery }
        });
    },

    /**
     *用户访问别人的主页
     * email: 被访问者的email
     */
      * getUserGallery({ payload: { uid }}, { call, put }){
      const gallery = yield call(galleryService.getMyGallery, uid);
      const visitedUser = yield call(userService.getUser, uid);
      console.log("/getUserGallery/UserInfo");
      console.log(visitedUser);
      yield put(
        {
          type: 'saveGallery',
          payload: { gallery }
        });
      yield put({
        type: 'saveVisitedUser',
        payload:{ visitedUser },
      });
    },

    *getDetail({ payload: { gid }}, { call, put }) {
      const detail = yield call(galleryService.getGalleryDetail, gid);
      yield put(
        {
          type: 'saveDetail',
          payload: { detail },
        }
      );
    },
    * likeGallery({payload: { gid, path }}, { call, put }){
      const result = yield call(galleryService.likeGallery,gid);
      if(result!=="SUCCESS"){
        message.error("点赞失败");
      }else {
        if(path === '/PicDetail'){
          yield put(routerRedux.push({
            pathname: path,
            query: {
              gid
            }
          }))
        }else {
          yield put(routerRedux.push({
            pathname: path
          }))
        }
      }
    },
    * unlikeGallery({payload: { gid, path }}, { call, put }){
      const result = yield call(galleryService.unlikeGallery,gid);
      if(result!=="SUCCESS"){
        message.error("取消点赞失败");
      }else {
        if(path === '/PicDetail'){
          yield put(routerRedux.push({
            pathname: path,
            query: {
              gid
            }
          }))
        }else {
          yield put(routerRedux.push({
            pathname: path
          }))
        }
      }
    }
  },

  reducers: {
    saveGallery(state, { payload: { gallery }}) {

      return { ...state, gallery };
    },
    saveDetail(state, { payload: { detail }}) {
      return { ...state, detail };
    },
    saveVisitedUser(state, { payload: { visitedUser}}) {
      return{ ...state, visitedUser};
    },
  },

};

