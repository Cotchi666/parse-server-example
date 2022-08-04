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

  User.set("username", req.params.username);
  User.set("password", req.params.password);
  User.set("email", req.params.email)

  await User.save()

  return 'OK';
});
Parse.Cloud.define('find-user', async req => {
  // User.set("username", "chien");
  // User.set("password", '12345678');
  // User.set("email", "chien@gmail.com")

  // await User.save()

  return 'OK';
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


Parse.Cloud.define('get-user-by-id', async req => {
  // User.set("username", "chien");
  // User.set("password", '12345678');
  // User.set("email", "chien@gmail.com")

  // await User.save()

  var q = new Parse.Query(User);
  q.include('room.parent')
  var room = await q.get(req.params.objectId);
  
  
  console.log(room)
  return room;
});
