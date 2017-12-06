import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as followService from '../services/followService';
export default {

  namespace: 'followManage',

  state: {
    follows: [],//{groupID:0,groupMember:[{userEmail,username,avatarUrl}]
  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/FollowManage') {
          dispatch({
            type: 'getFollows',
          });
        }
      });
    },
  },

  effects: {
    *getFollows({ payload }, { call, put }) {  // eslint-disable-line
      // const follows = yield call(followService.getFollows,window.sessionStorage.getItem("email"));
      const follows = yield call(followService.getFollows);
      yield put(
        {
          type: 'saveFollows',
          payload: { follows }
        }
      );
    },
    *addGroup({ payload: {groupName} }, { call }) {  // eslint-disable-line
      const addResult = yield call(followService.addGroup,groupName);
      if(!addResult) {
        message.error("创建新分组失败，请检查分组名是否重复");
      }
    },
    *delMembers({ payload:{groupID,memberEmails}}, {call,put}) {
      const result = yield call(followService.delMembers, groupID, memberEmails);
      if(!result){
        message.error("删除失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname: '/FollowManage'
          })
        );
      }
    },
    *cancelFollow({ payload:{memberEmails}}, {call,put}) {
      const result = yield call(followService.cancelFollow, memberEmails);
      if(!result){
        message.error("删除失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname:"/FollowManage"
        }))
      }
    },
    *moveMembers({ payload: { from, to, memberEmails}},{call}){
      const result = yield call(followService.moveMembers,from, to, memberEmails );
      if(!result){
        message.error("移动失败，请稍后重试");
      }
    }
  },

  reducers: {
    saveFollows(state, { payload: { follows }}) {
      return { ...state, follows };
    },
  },

};

