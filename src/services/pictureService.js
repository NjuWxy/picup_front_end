import request from '../utils/request';

const gallery = [
  {
    shareID:'11',
    imgUrls:[
      "/Users/john/project/PicUp/picup_front_end/src/assets/cat.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/qingzi.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/2.jpg",
    ],
    title: "这是第1个",
    username: "用户1",
    time: "12月3日",
    likeNum: 244
  },
  {
    shareID:'12',
    imgUrls:[
      "/Users/john/project/PicUp/picup_front_end/src/assets/qingzi.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/cat.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/2.jpg",
    ],
    title: "这是第2个",
    username: "用户1",
    time: "12月3日",
    likeNum: 244
  },
  {
    shareID:'13',
    imgUrls:[
      "/Users/john/project/PicUp/picup_front_end/src/assets/2.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/qingzi.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/cat.jpg",
    ],
    title: "这是第3个",
    username: "用户1",
    time: "12月3日",
    likeNum: 244
  },
  {
    shareID:'14',
    imgUrls:[
      "/Users/john/project/PicUp/picup_front_end/src/assets/avatar.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/qingzi.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/cat.jpg",
    ],
    title: "这是第4个",
    username: "用户1",
    time: "12月3日",
    likeNum: 244
  },
  {
    shareID:'15',
    imgUrls:[
      "/Users/john/project/PicUp/picup_front_end/src/assets/2.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/qingzi.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/cat.jpg",
    ],
    title: "这是第5个",
    username: "用户1",
    time: "12月3日",
    likeNum: 244
  },
  {
    shareID:'15',
    imgUrls:[
      "/Users/john/project/PicUp/picup_front_end/src/assets/qingzi.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/2.jpg",
      "/Users/john/project/PicUp/picup_front_end/src/assets/cat.jpg",
    ],
    title: "这是第5个",
    username: "用户1",
    time: "12月3日",
    likeNum: 244
  },
];

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


