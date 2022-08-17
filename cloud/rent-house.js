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
// var query = new Parse.Query(Room);
// query.contains('parent','VEKZbIMrDP' );
// const a = (await query.count()).toString()
// count.push(a)
Parse.Cloud.define('get-house-with-count', async req => {
  // var rentHouse = new RentHouse();
  // var data = {
  //   address: req.params.address
  // };
  // await rentHouse.save(data, {
  //   success: function (obj) {
  //     console.log('Saved successfully'  , obj.id);
  //   },
  //   error: function (err) {
  //     console.log(err);
  //   },
  // });
    var queryH = Parse.Query(RentHouse)
    
  return 'ok';
});
