
const { query } = require('express');
const { async } = require('parse/lib/browser/StorageController.browser');

const Room = Parse.Object.extend('Room');

//create a room by brand hostel
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
  return 'Created a new room  successfully';
});

//get room by name
Parse.Cloud.define('get-room-byname', async req => {
       
          const name = req.params.name;
          var query =  new Parse.Query(Room)
          var room =  query.equalTo('name', name);
          query.include('parent')
          let result =  await room.find();
         
          
          // for(let i = 0; i< result.length; i++){
          //     var thisRoom = result[i];   
          // }
          // var c = thisRoom
  return result;
});

//create a room when a customer order
Parse.Cloud.define('create-ordered-room', async req => {
       
 
return result;
});
