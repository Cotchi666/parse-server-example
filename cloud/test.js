const Order = Parse.Object.extend('Order');
const Room = Parse.Object.extend('Room');

Parse.Cloud.define('payment', req => {
  var q = new Parse.Query(Order);
  q.equalTo('objectId', req.params.objectId);
  const a = q.first().then(obj => {
    obj.set('isPaid', true);
    obj.save();
  });

  console.log('checking', a);

  return a;
});
Parse.Cloud.define('PAYPAL', (req, res) => {
  const arr = [];
  var a = 'AaCSy0DbFkyV9Sq1WgPZEwbk_O8RMo49-2s-SNOmyrHonODbz-kY7YR-F53I5RnGNlMcNkBmLLbZmux3';
  arr.push(a);
  return arr;
});

Parse.Cloud.define('order', async req => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('objectId', req.params.user_id);
  const objUser = await query.first();
  const order = new Order();
  var q = new Parse.Query('Room');

  q.equalTo('objectId', req.params.room_id);
  q.first().then(function (obj) {
    console.log('checking', obj);

    order.set('fullName', req.params.fullName);
    order.set('email', req.params.email);
    order.set('phone', req.params.phone);
    order.set('paymentMethod', req.params.paymentMethod);
    order.set('isPaid', false);
    order.set('room_id', obj);
    order.set('user_id', objUser);
    order.save();
  });

  return objUser;
});

Parse.Cloud.define('get-order', async req => {
  const qr = new Parse.Query(Room);
  qr.equalTo('objectId', req.params.room_id);
  const room_id = await qr.first();
  const queryOrder = new Parse.Query(Order);
  queryOrder.equalTo('room_id', room_id);
  queryOrder.include('room_id.parent');
  const objOrder = await queryOrder.first();
  console.log('objjjjj', objOrder);
  return objOrder;
});

Parse.Cloud.define('get-order-mine', async req => {

  const qr = new Parse.Query(Parse.User);
  qr.equalTo('objectId', req.params.user_id);
  const user_id = await qr.first();

  const queryOrder = new Parse.Query(Order);
  queryOrder.equalTo('user_id', user_id);
  const objOrder = await queryOrder.first();
  
  console.log('objjjjj', objOrder);
  return objOrder;
});
