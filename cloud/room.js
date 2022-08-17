const { query } = require('express');
const { masterKey } = require('parse');
const { async } = require('parse/lib/browser/StorageController.browser');

const Room = Parse.Object.extend('Room');
const RentHouse = Parse.Object.extend('RentHouse');
//create a room by brand hostel
Parse.Cloud.define('create-new-room', req => {
  const room = new Room();
  const name = req.params.name;
  var q = new Parse.Query('RentHouse');
  //query
  q.equalTo('objectId', 'VEKZbIMrDP');
  //Retrieves at most one Parse.Object that satisfies this query.
  q.first().then(function (obj) {
    console.log(obj.attributes);
    room.set('parent', obj);
    room.set('name', name);
    room.save();
  });
  return 'Created a new room  successfully';
});

// //get room by name
// Parse.Cloud.define('get-room-byname', async req => {
//   const name = req.params.name;
//   var query = new Parse.Query(Room);
//   var room = query.equalTo('name', name);
//   query.include('parent');
//   let result = await room.find();
//   return result;
// });

//create a room when a customer order
Parse.Cloud.define('create-ordered-room', async req => {
  return result;
});

//create a room when a customer order
Parse.Cloud.define('delete-room-by-name', async req => {
  //get data from client
  const name = req.params.name;
  //declare query
  var query = new Parse.Query(Room);
  //let room = await query.get('12SDaDAoqi1')--- fill a objectId into get()
  //query
  var room1 = query.equalTo('name', name);
  //Retrieves at most one Parse.Object that satisfies this query.
  var data = room1.first();
  //Destroy
  (await data).destroy();

  return data;
});

//get room by name
Parse.Cloud.define('get-room-id', async req => {
  const count = [];
  // const request = ['VEKZbIMrDP',req.parram.objectId];

  // //  req.parram.objectId1
  // //  req.parram.objectId1
  // //  req.parram.objectId1

  var query = new Parse.Query(Room);
  query.contains('parent','VEKZbIMrDP' );
  const a = (await query.count()).toString()
  count.push(a)

  // console.log("a", a
  console.log("check out",a)


  var query2 = new Parse.Query(Room);
  query2.contains('parent', 'N5POngLfKz');
  const b = (await query2.count()).toString()
  // count.push(b);
  count.push(b)

  var query3 = new Parse.Query(Room);
  query3.contains('parent', 'gyAvGiV70d');
  const c = (await query3.count()).toString()
  // count.push(b);
  count.push(c)


    return count
});
