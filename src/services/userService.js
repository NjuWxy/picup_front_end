import request from '../utils/request';
import { getUserName, getUid } from '../utils/tools';

export function signUp(username,password) {
  console.log(password);
  const formData = new window.FormData();
  formData.append('username', username);
  formData.append('password', password);
  const promise = request('/api/user/signUp', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"signUp");
    return v.data;
  });
}

export function login(username,password) {
  const formData = new window.FormData();
  formData.append('username', username);
  formData.append('password', password);
  const promise = request('/api/user/login', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"login");
    return v.data;
  });
}

export function changePassword(oldPassword,newPassword) {
  console.log("oldPassword:"+oldPassword);
  console.log("newPassword:"+newPassword);
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('oldPassword', oldPassword);
  formData.append('newPassword', newPassword);
  const promise = request('/api/user/changePassword', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"changePassword");
    return v.data;
  });
}


export function getUser(uid) {
  const formData = new window.FormData();
  formData.append('uid', uid);
  const promise = request('/api/user/getUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getUser");
    return v.data;
  });
}

export function getMessageList() {
  const formData = new window.FormData();
  formData.append('uid', getUid());
  const promise = request('/api/messageList', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"messageList");
    return v.data;
  });
}


export function postAvatar(avatarFileName) {
  const formData = new window.FormData();
  formData.append('username',getUserName() );
  formData.append('avatarFileName', avatarFileName);
  const promise = request('/api/user/postAvatar', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"postAvatar");
    return v.data;
  });
}

export function followUser(followedUsername) {
  const formData = new window.FormData();
  formData.append('username',getUserName() );
  formData.append('followedUsername', followedUsername);
  const promise = request('/api/user/followUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"followUser");
    return v.data;
  });
}


export function unfollowUser(followedUsername) {
  const formData = new window.FormData();
  formData.append('username',getUserName() );
  formData.append('followedUsername', followedUsername);
  const promise = request('/api/user/unfollowUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"unfollowUser");
    return v.data;
  });
}

export function unfollowUserList(followedUsernameList) {
  const formData = new window.FormData();
  formData.append('username',getUserName() );
  formData.append('followedUsernameList', followedUsernameList);
  const promise = request('/api/user/unfollowUserList', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"unfollowUserList");
    return v.data;
  });
}

export function followedUser() {
  const formData = new window.FormData();
  formData.append('username',getUserName() );
  const promise = request('/api/user/followedUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"followedUser");
    return v.data;
  });
}



function printInfo(info,func) {
  console.log("userService/"+func+": "+info);
}
