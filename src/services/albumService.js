import request from '../utils/request';
import { getUserName } from '../utils/tools';


// export function delAlbum(albumID) {
//   let delIndex = -1;
//   for(let i=0;i<albums.length;i++){
//     if(albums[i].aid === albumID){
//       delIndex = i;
//       break;
//     }
//   }
//   if(delIndex!==-1){
//     albums.splice(delIndex,1);
//   }
//   return true;

let albums = [
  {aid: 1,name: '相册1',date: '12月12日'},
  {aid: 2,name: '相册2',date: '12月12日'},
  {aid: 3,name: '相册3',date: '12月12日'},
  {aid:4,name: '相册4',date: '12月12日'},
  {aid:5,name: '相册5',date: '12月12日'},
  {aid: 6,name: '相册6',date: '12月12日'},
  {aid:7,name: '相册7',date: '12月12日'},
];
//
// export function getAlbums() {
//   return albums;
// }

export function getAlbums() {
  const formData = new window.FormData();
  formData.append("username",getUserName());
  const promise = request('/api/album/getAlbums',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getAlbums");
    return v.data;
  });
}

export function createAlbum(album) {
  const formData = new window.FormData();
  formData.append("username",getUserName());
  formData.append("album",album);
  const promise = request('/api/album/createAlbum',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"createAlbum");
    return v.data;
  });
}

export function deleteAlbum(aid) {
  const formData = new window.FormData();
  formData.append("aid",aid);
  const promise = request('/api/album/deleteAlbum',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"deleteAlbum");
    return v.data;
  });
}


export function getAlbumDetail(aid) {
  const formData = new window.FormData();
  formData.append("aid",aid);
  const promise = request('/api/album/albumDetail',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"albumDetail");
    return v.data;
  });
}


function printInfo(info,func) {
  console.log("albumService/"+func+": "+info);
}



