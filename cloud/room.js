
const { query } = require('express');
const { async } = require('parse/lib/browser/StorageController.browser');

const Room = Parse.Object.extend('Room');

//authorized function
// const validationRules = request => {
//   if (request.master) {
//     return;
//   }
//   if (!request.user || request.user.id !== 'masterUser') {
//     throw 'Unauthorized';
//   }
// }

Parse.Cloud.define('create-new-room', req => {
  const room = new Room();
  const name = req.params.name;
  var q = new Parse.Query('RentHouse');
  q.equalTo('objectId', 'VEKZbIMrDP');
  q.first().then(function (obj) {
    console.log(obj.attributes);
    room.set('parent', obj);
    room.set('name', name);
    room.save();
  });
  // var qRoom = new Parse.Query('Room');
  // q.room.get()
  return 'ok';
});
// },validationRules);

// Parse.Cloud.afterSave('create-new-room', async req =>{
//          var room= req.object  ;
//          console("checking" + room)
//          room.get("parent").fetch().then(function(obj){
//                       obj.set('address', 'Q 6');
//                       obj.save();
//          })
         
// }
  
// );
Parse.Cloud.define('get-person-byname', async req => {
        //  var promise = new Parse.Promise()
          const name = req.params.name;
          var query =  new Parse.Query(Room)
          var room =  query.equalTo('name', name);
          let result =  await room.find();

          // for(let i = 0; i< result.length; i++){
          //     let thisRoom = result[i];
              
          // }
          // room.find().then(function (obj) {
          // //  var info = obj.get("name")
          // promise.resolve()
          //  console.log(obj)
          
          // });
          // var room =  await query.get(name);
          // var info = room.get('name');
          // console.log(info)
          
  return result;
});
