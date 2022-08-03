
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
  return 'ok';
});
// },validationRules);

Parse.Cloud.afterSave('create-new-room', function()  {
  console.log("SOS")
  
});
