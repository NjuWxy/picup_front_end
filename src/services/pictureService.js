import request from '../utils/request';



let albums = [
  {aid: 1,name: '相册1',date: '12月12日'},
  {aid: 2,name: '相册2',date: '12月12日'},
  {aid: 3,name: '相册3',date: '12月12日'},
  {aid:4,name: '相册4',date: '12月12日'},
  {aid:5,name: '相册5',date: '12月12日'},
  {aid: 6,name: '相册6',date: '12月12日'},
  {aid:7,name: '相册7',date: '12月12日'},
];

export function getAlbums() {
  return albums;
}

export function getHotGallery(username,pageNum) {
  const formData = new window.FormData();
  formData.append('username', username);
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

export function delAlbum(albumID) {
  let delIndex = -1;
  for(let i=0;i<albums.length;i++){
    if(albums[i].aid === albumID){
      delIndex = i;
      break;
    }
  }
  if(delIndex!==-1){
    albums.splice(delIndex,1);
  }
  return true;
}

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


