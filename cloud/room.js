// const { async } = require('parse/lib/browser/Storage');

const { async } = require("parse/lib/browser/StorageController.browser");

const Room = Parse.Object.extend('Room');
const RentHouse = Parse.Object.extend('RentHouse');


Parse.Cloud.define('create-new-room',  req => {
  const room = new Room();
  const name = req.params.name
  var q = new Parse.Query("RentHouse");
  q.equalTo('objectId', 'VEKZbIMrDP');
  q.first().then(function (obj) {
    console.log(obj.attributes)
    room.set("parent", obj)
   var a = room.set("name" , name)
    console.log(a)
     room.save();
    })
  
  return 'ok';
});

Parse.Cloud.afterSave('create-new-room', req => {
  var room = req.object;
  if (!room.existed()) {
    console.log("thanh cong roi");
  
  }
})
// var q = new Parse.Query("RentHouse");
// q.equalTo('objectId', 'VEKZbIMrDP');
// q.first().then(function (obj) {
//   console.log(obj.attributes)
//   room.set("parent", obj.attributes)
//   room.save(null, {
//     success: function () {
//       console.log("ok")
//     }
//   })
// })