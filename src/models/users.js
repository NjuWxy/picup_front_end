import * as userService from '../services/example';

export default {
  namespace: 'users',
  state: {
    isLogin: (window.sessionStorage.getItem('email') === null),
    username: '高岳'
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
    * test({ payload }, { call, put }) {
      console.log('userinfo');
      yield call(userService.getUserInfo);
    },
  },

  reducers: {

  }
};

