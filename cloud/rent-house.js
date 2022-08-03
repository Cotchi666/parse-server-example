const { async } = require('parse/lib/browser/Storage');

const RentHouse = Parse.Object.extend('RentHouse');

Parse.Cloud.define('create-new-renthouse', async req => {
  var rentHouse = new RentHouse();
  var data = {
    address: req.params.address
   
  };
  await rentHouse.save(data, {
    success: function (obj) {
      console.log('Saved successfully'  , obj.id);
      
    },
    error: function (err) {
      console.log(err);
    },
  });
  return 'ok';
});
// Parse.Cloud.define('delete-user', async req => {
//   var user = new User();
//   var data = {
//     username: req.params.username,
//     password: req.params.password,
//   };
//   await user.save(data, {
//     success: function (obj) {
//       console.log('Saved successfully'  , obj.id);
//     },
//     error: function (err) {
//       console.log(err);
//     },
//   });
//   return 'ok';
// });

