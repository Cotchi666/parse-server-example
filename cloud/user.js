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
  // User.set("username", "chien");
  // User.set("password", '12345678');
  // User.set("email", "chien@gmail.com")

  // await User.save()

  return 'OK';
});
Parse.Cloud.define('find-user', async req => {
  // User.set("username", "chien");
  // User.set("password", '12345678');
  // User.set("email", "chien@gmail.com")

  // await User.save()

  return 'OK';
});
//create user with room id
Parse.Cloud.define('create-ordered-room-for-user', async req => {
  //const name = req.params.name;
  const RoomId = req.params.objectId;
  const username = req.params.username;
  const password = req.params.password;
  if (!RoomId) {
    User.set('username', username);
    User.set('password', password);
    // const email = req.params.email;
    User.save();
  } else {
    var q = new Parse.Query('Room');
    var foundRoom = await q.get(RoomId);
    User.set('username', username);
    User.set('password', password);
    // User.set('email', email);
    User.set('room', foundRoom);
    User.save();
  }

  return 'ok';
});
//update user with room id
Parse.Cloud.define('update-ordered-room-for-user', async req => {
  console.log('check data',req.params.room.objectId)
  var q = new Parse.Query(Room);
  var room = await q.get(req.params.room.objectId);
  var query = new Parse.Query(User);
  query.equalTo('username', req.params.username);

  var user = await query.first().then(function(obj){
    obj.set('room', room);
    obj.save(null, { useMasterKey: true });
  
  });
 console.log(user)

  return 'ok';
});
