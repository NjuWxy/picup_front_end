import request from '../utils/request';

let follows = [
  {
    groupID:'特别关注',
    groupMember:[
    ]
  },
  {
    groupID:'大明星',
    groupMember:[
    ]
  }
];

let newFollows = [
  {key: '12258643@qq.com',email: '12258643@qq.com',username: 'Gaoyue',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '223f3@qq.com',email: '223f3@qq.com',username: '煤气罐儿大明星',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '3dfjhkdsg243@qq.com',email: '3dfjhkdsg243@qq.com',username: '小月月大明星',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '1213@qq.com',email: '挨1213@qq.com',username: 'Gaoyue',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '221458763@qq.com',email: '221458763@qq.com',username: '煤气罐儿',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
  {key: '32901913@qq.com',email: '32901913@qq.com',username: '小月月',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
];

export function getFollows() {

  return newFollows;
  // const body = {email};
  // console.log(body);
  // const promise = request('/api/users/getFollows', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  // return promise.then((v) => {
  //   return v.data;
  // });
}

export function addGroup(groupName) {
  const newGroup = {groupID: groupName,groupMember: []};
  follows.push(newGroup);
  console.log("service"+groupName);
  console.log("service"+follows);
  return true;
  // const body = {
  //   email:window.sessionStorage.getItem("email"),
  //   groupName
  // };
  // console.log(body);
  // const promise = request('/api/users/getFollows', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  // return promise.then((v) => {
  //   return v.data;
  // });
}

/**
 * 从某个分组中删除关注成员
 * @param groupID 分组名
 * @param memberEmails 该分组需要删除的成员ID
 */
export function delMembers(groupID,memberEmails) {
  let groupMember = [];
  let groupIndex = -1;
  for(let i=0;i<follows.length;i++){
    if(follows[i].groupID === groupID){
      groupMember = follows[i].groupMember;
      groupIndex = i;
      break;
    }
  }
  for(let i=0;i<memberEmails.length;i++){
    groupMember = delSingleMember(memberEmails[i],groupMember);
  }
  // console.log("service:"+groupMember);
  follows.splice(groupIndex,1,{groupID,groupMember});
  return true;
  // const body = {
  //   email:window.sessionStorage.getItem("email"),
  //   groupID,members
  // };
  // console.log(body);
  // const promise = request('/api/users/getFollows', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  // return promise.then((v) => {
  //   return v.data;
  // });
}

/**
 * 删除关注成员
 * @param memberEmails 需要删除的成员ID
 */
export function cancelFollow(memberEmails) {
  console.log(memberEmails);
  for(let i=0;i<memberEmails.length;i++){
    newFollows = delSingleMember(memberEmails[i],newFollows);
  }
  return true;
  // const body = {
  //   email:window.sessionStorage.getItem("email"),
  //   groupID,members
  // };
  // console.log(body);
  // const promise = request('/api/users/getFollows', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  // return promise.then((v) => {
  //   return v.data;
  // });
}

export function moveMembers(from, to, memberEmails) {
  let toIndex = -1;
  for(let i=0;i<follows.length;i++){
    if(follows[i].groupID === to){
      toIndex = i;
      break;
    }
  }
  delMembers(from,memberEmails);
  let newGroupMember = follows[toIndex].groupMember;
  newGroupMember.push(
    {email: '32433@qq.com',username: '小馨雨大大明星',avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
  );
  follows.splice(toIndex,1,{
    groupID: to,
    groupMember: newGroupMember
  });
  console.log(follows[toIndex].groupMember.length);
  console.log(follows[toIndex].groupMember);

  return true;
  // const body = {
  //   email:window.sessionStorage.getItem("email"),
  //   from,to,memberEmails
  // };
  // console.log(body);
  // const promise = request('/api/users/getFollows', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  // return promise.then((v) => {
  //   return v.data;
  // });
}

/**
 * 从关注的成员数组里面删除指定的成员
 * @param memberEmail 成员ID
 * @param groupMember 成员数组
 */
function delSingleMember(memberEmail,groupMember) {
  let delIndex = -1;
  for(let i=0;i<groupMember.length;i++){
    if(groupMember[i].email === memberEmail){
      delIndex = i;
      break;
    }
  }
  groupMember.splice(delIndex,1);

  return groupMember;
}

