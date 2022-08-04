// const { async } = require('parse/lib/browser/Storage');

// const User = Parse.Object.extend('_User');

// Parse.Cloud.define('create-new-user', async req => {
//   var user = new User();
//   var data = {
//     username: req.params.username,
//     password: req.params.password,
//   };
//   await user.save(data, {
//     success: function (obj) {
//       console.log('Saved successfully', obj.id);

//     },
//     error: function (err) {
//       console.log(err);
//     },
//   });
//   return 'ok';
// });

// Parse.Cloud.afterSave('create-new-user', function(request) {
//   // code here
//   var RentHouse = Parse.Object.extend('RentHouse');
//       var renthouse = new RentHouse();

//       renthouse.set('address', 'HCMM');
//       renthouse.set('userID', user);

//       console.log("hellooooooo"+ user.data)
//       renthouse.save(null, {
//         success: function (obj) {
//           console.log('Saved successfully', obj.id);
//         },
//         error: function (error) {
//           console.log(error);
//         },
// })

// }
// )
// // Parse.Cloud.define('delete-user', async req => {
// //   var user = new User();
// //   var data = {
// //     username: req.params.username,
// //     password: req.params.password,
// //   };
// //   await user.save(data, {
// //     success: function (obj) {
// //       console.log('Saved successfully'  , obj.id);
// //     },
// //     error: function (err) {
// //       console.log(err);
// //     },
// //   });
// //   return 'ok';
// // });

const User = new Parse.User();
const Room = Parse.Object.extend('Room');

Parse.Cloud.define('create-new-user', async req => {
  User.set('username', req.params.username);
  User.set('password', req.params.password);
  User.set('email', req.params.email);
  await User.save();
  return 'OK';
});

//update user with room id
Parse.Cloud.define('update-ordered-room-for-user', async req => {
  var q = new Parse.Query(Room);
  var query = new Parse.Query(User);
  // get obj room by id
  var room = await q.get(req.params.room.objectId);
  //check username
  query.equalTo('username', req.params.username);
  //update room obj at user obj
  await query.first().then(function (obj) {
    obj.set('room', room);
    obj.save(null, { useMasterKey: true });
  });
  return 'ok';
});

//get user by id
Parse.Cloud.define('get-user-by-id', async req => {
  var q = new Parse.Query(User);
  // return full User's data
  q.include('room.parent');
  var room = await q.get(req.params.objectId);
  return room;
});

//find user by name or id
Parse.Cloud.define('find-user', async req => {
  if (req.params.username) {
    var query = new Parse.Query(User);
    query.equalTo('username', req.params.username);
    var result = await query.first();
  } else {
    var q = new Parse.Query(User);
    var result = await q.get(req.params.objectId);
  }
  return result;
});
