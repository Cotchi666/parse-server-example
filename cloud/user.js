const { async } = require('parse/lib/browser/Storage');

const User = Parse.Object.extend('_User');

Parse.Cloud.define('create-new-user', async req => {
  var user = new User();
  var data = {
    username: req.params.username,
    password: req.params.password,
  };
  await user.save(data, {
    success: function (obj) {
      console.log('Saved successfully', obj.id);

    },
    error: function (err) {
      console.log(err);
    },
  });
  return 'ok';
});

Parse.Cloud.afterSave('create-new-user', function(request) {
  // code here
  var RentHouse = Parse.Object.extend('RentHouse');
      var renthouse = new RentHouse();

      renthouse.set('address', 'HCMM');
      renthouse.set('userID', user);

      console.log("hellooooooo"+ user.data)
      renthouse.save(null, {
        success: function (obj) {
          console.log('Saved successfully', obj.id);
        },
        error: function (error) {
          console.log(error);
        },
})

}
)
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
