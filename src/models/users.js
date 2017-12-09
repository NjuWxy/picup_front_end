import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as userService from '../services/userService';
import { removeUser, saveUser, saveAvatar, savePassword } from '../utils/tools';

export default {
  namespace: 'users',
  state: {
    followedUser: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname })=> {
        if(pathname === '/UserPage') {
          dispatch({
            type:'test'
          });
        }
        if( pathname === '/FollowManage') {
          dispatch({
            type: 'followedUser',
          })
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
          saveUser(userInfo.uid,userInfo.username,userInfo.password,userInfo.avatar);
          yield put(routerRedux.push({
            pathname: '/HotGallery'
          }));
        }
      }
    },
    * login({payload: { username,password }},{ call, put }){
      const userInfo = yield call(userService.login, username, password);
      console.log(userInfo);
      if(userInfo==="FAILURE"){
        message.error("登陆失败");
      }else {
        saveUser(userInfo.uid,userInfo.username,userInfo.password,userInfo.avatar);
        yield put(routerRedux.push({
          pathname: '/HotGallery'
        }));
      }
    },
    * logout({payload},{put}){
      console.log("logout");
      removeUser();
      yield put(routerRedux.push({
        pathname: '/HotGallery',
      }))
    },
    * changePassword({ payload: { oldPassword, newPassword }}, { call,put }) {
      const result = yield call(userService.changePassword,oldPassword,newPassword);
      console.log(result);
      if(result === 'SUCCESS'){
        message.success("修改密码成功");
        savePassword(result);
        yield put(routerRedux.push({
          pathname: '/HotGallery'
        }));
      }else {
        message.error("woops，修改密码失败，请检查原密码是否正确");
      }
    },
    * postAvatar({ payload: { avatarFileName }}, { call, put }) {
      const result = yield call(userService.postAvatar,avatarFileName);
      console.log("postAvatar:"+result);
      if(result === 'FAILURE'){
        message.error("更新头像失败");
      }else {
        message.success("更新头像成功");
        const avatar = result;
        console.log(avatar);
        saveAvatar(avatar);
        yield put(routerRedux.push({
          pathname: '/HotGallery'
        }));
      }
    },
    * followUser({ payload: { followedUsername, gid }}, { call, put }){
      const result = yield call(userService.followUser, followedUsername);
      if(result !== "SUCCESS"){
        message.error("关注失败");
      }else {
        yield put(routerRedux.push({
          pathname: '/PicDetail',
          query: {
            gid
          }
        }))
      }
    },
    * unfollowUser({ payload: { followedUsername, gid }}, { call, put }){
      const result = yield call(userService.unfollowUser, followedUsername);
      if(result !== "SUCCESS"){
        message.error("取消关注失败");
      }else {
        yield put(routerRedux.push({
          pathname: '/PicDetail',
          query: {
            gid
          }
        }))
      }
    },
    * unfollowUserList({ payload: { followedUsernameList }}, { call, put }){
      console.log(followedUsernameList);
      const result = yield call(userService.unfollowUserList, followedUsernameList);
      if(result !== "SUCCESS"){
        message.error("取消关注失败");
      } else {
        yield put(routerRedux.push({
          pathname: '/FollowManage'
        }))
      }
    },
    * followedUser({payload},{ call, put }){
      const result = yield call(userService.followedUser);
      yield put({
        type: 'saveFollowedUser',
        payload: {
          followedUser: result
        }
      })
    }


  },

  reducers: {
    saveFollowedUser( state, { payload: { followedUser }}){
      return { ...state, followedUser };
    }
  }
};

