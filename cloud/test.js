const Order = Parse.Object.extend('Order');

Parse.Cloud.define('order', req => {
  const order = new Order();
  const fullName = req.params.fullName;
  const phone = req.params.phone;
  const email = req.params.email;
  const room_id = req.params.room_id;
  var q = new Parse.Query('Room');
  //query
  q.equalTo('objectId', room_id);
  q.first().then(function (obj) {
    console.log(obj.attributes);

    // order.set('fullName', fullName);
    order.set('email', email);
    order.set('phone', phone);
    order.set('room_id', obj);

    order.save();
  });
  return 'Created order successfully!!';
});
