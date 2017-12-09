import request from '../utils/request';

export function post(fileNames,title,description, tags, albumId, uid) {
  const formData = new window.FormData();
  formData.append('fileNames', fileNames);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('tags', tags);
  formData.append('albumId', albumId);
  formData.append('uid', uid);
  const promise = request('/api/photo/postPhoto', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    console.log(v.data+"==========login");
    return v.data;
  });
}
