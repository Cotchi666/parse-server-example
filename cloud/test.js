const Order = Parse.Object.extend('Order');

// Parse.Cloud.define('order', req => {
//   const order = new Order();
//   const fullName = req.params.fullName;
//   const phone = req.params.phone;
//   const email = req.params.email;
//   const room_id = req.params.room_id;
//   const paymentMethod = req.params.paymentMethod;
//   const user_id = req.params.user_id;

//   var qu = new Parse.Query('User');

//   var q = new Parse.Query('Room');
//   //query
//   q.equalTo('objectId', room_id);
//   q.first().then(function (obj) {
//     console.log(obj.attributes);

//     order.set('fullName', fullName);
//     order.set('email', email);
//     order.set('phone', phone);
//     order.set('paymentMethod', paymentMethod);
//     order.set('room_id', obj);
//     // order.set('user_id', userObj);
//     order.save();
//   });

//   return 'OK';
// });
Parse.Cloud.define('payment', req => {
  var q = new Parse.Query(Order);
  q.equalTo('objectId', 'r1po6q4czp');
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

// const User = Parse.User({
//   // Instance methods
//   hasSuperHumanStrength: function (objectId) {
//     return this.get("objectId") = objectId;
//   }})

// Parse.Cloud.define('order', req => {
// const user = User.hasSuperHumanStrength(req.params.user_id)
//  console.log("user", user)

//   //query
// ;
//   });
// const User = Parse.User()

Parse.Cloud.define('order', async req => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('objectId', req.params.user_id);
  const objUser = await query.first();
  const order = new Order();
  var q = new Parse.Query('Room');
  
  q.equalTo('objectId', req.params.room_id);
  q.first().then(function (obj) {
    console.log("checking",obj);

    order.set('fullName', req.params.fullName);
    order.set('email', req.params.email);
    order.set('phone', req.params.phone);
    order.set('paymentMethod', req.params.paymentMethod);
    order.set('room_id', obj);
    order.set('user_id', objUser);
    order.save();
  });

  return objUser;
});
