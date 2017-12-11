import request from '../utils/request';
import { getUserName, getUid } from '../utils/tools';

export function getHotGallery(pageNum) {
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('pageNum', pageNum);
  const promise = request('/api/gallery/hotGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========getHotGallery");
    return v.data;
  });
}

export function getLatestGallery(pageNum) {
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('pageNum', pageNum);
  const promise = request('/api/gallery/latestGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========latestGallery");
    return v.data;
  });
}

export function getInterestGallery() {
  const formData = new window.FormData();
  formData.append('username', getUserName());
  const promise = request('/api/gallery/interestGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========interestGallery");
    return v.data;
  });
}

/**
 *
 * @param uid 访问者
 * @returns {Promise.<TResult>}
 */
export function getMyGallery(uid=getUid()) {
  const formData = new window.FormData();
  formData.append('visitor', getUid());
  formData.append('uid', uid);
  console.log(uid+"==========="+getUid());
  const promise = request('/api/gallery/myGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========myGallery");
    return v.data;
  });
}


export function searchGallery(tag) {
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('keyWords', tag);
  const promise = request('/api/gallery/searchGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========searchGallery");
    return v.data;
  });
}


export function getGalleryDetail(gid) {
  // console.log(gid);
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('gid', gid);
  const promise = request('/api/gallery/detail', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========detail");
    return v.data;
  });
}

export function likeGallery(gid) {
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('gid', gid);
  const promise = request('/api/gallery/likeGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========likeGallery");
    return v.data;
  });
}

export function unlikeGallery(gid) {
  const formData = new window.FormData();
  formData.append('username', getUserName());
  formData.append('gid', gid);
  const promise = request('/api/gallery/unlikeGallery', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========unlikeGallery");
    return v.data;
  });
}





