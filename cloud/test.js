

const Test = Parse.Object.extend("Test");


Parse.Cloud.define('test', req => {
  var q = new Parse.Query('RentHouse');
  q.equalTo('objectId', 'VEKZbIMrDP');
  q.first().then(function (obj) {
    console.log(obj.attributes);
    var test = new Test();
    var data = {
      address: req.params.address,
      parent: obj.attributes
    };
    test.save(data,{
      success: function (obj) {
        console.log('Saved successfully'  , obj);
        
      },
      error: function (err) {
        console.log(err);
      },
    })
  });
  console.log(data);
  return 'Hi';
});
