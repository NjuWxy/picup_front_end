import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as userService from '../services/userService';

export default {
  namespace: 'users',
  state: {
    isLogin: false,
    userInfo:{},
    albums: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname })=> {
        if(pathname === '/UserPage') {
          dispatch({
            type:'test'
          });
        }
      });
    }
  },

  effects: {
    * signUp({ payload:{username,password} }, { call, put }) {
      console.log(username);
      const result = yield call(userService.signUp,username,password);
      if(result !== "SUCCESS"){
        message.error("该用户名已被占用");
      }else {
        const userInfo = yield call(userService.login,username,password);
        if(userInfo==="FAILURE"){
          message.error("登陆失败");
        }else {
          window.sessionStorage.setItem("username",username);
          const albums  = yield call(userService.getAlbums, username);
          yield put({
            type: 'saveUserInfo',
            payload: { userInfo,isLogin: true, albums }
          });
          yield put(routerRedux.push({
            pathname: '/HotGallery'
          }));
        }
      }
    },
    * login({payload: { username,password }},{ call, put }){
      const userInfo = yield call(userService.login, username, password);
      if(userInfo==="FAILURE"){
        message.error("登陆失败");
      }else {
        window.sessionStorage.setItem("username",username);
        const albums  = yield call(userService.getAlbums, username);
        yield put({
          type: 'saveUserInfo',
          payload: { userInfo, isLogin: true, albums }
        });
        yield put(routerRedux.push({
          pathname: '/HotGallery'
        }));
      }
    },
    * logout({payload},{put}){
      window.sessionStorage.removeItem("username");
      yield put({
        type: 'saveUserInfo',
        payload: {
          userInfo: {},
          isLogin:false,
          albums: []
        }
      })
    },
  },

  reducers: {
    saveUserInfo(state,{payload:{userInfo,isLogin, albums }}){
      return{...state,userInfo,isLogin, albums};
    }
  }
};

