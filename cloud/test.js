const Order = Parse.Object.extend('Order');

Parse.Cloud.define('order', req => {
  const order = new Order();
  const fullName = req.params.fullName;
  const phone = req.params.phone;
  const email = req.params.email;
  const room_id = req.params.room_id;
  const paymentMethod = req.params.paymentMethod;
  const totalPrice = req.params.totalPrice;
  var q = new Parse.Query('Room');
  //query
  q.equalTo('objectId', room_id);
  q.first().then(function (obj) {
    console.log(obj.attributes);

    order.set('fullName', fullName);
    order.set('email', email);
    order.set('phone', phone);
    order.set('paymentMethod', paymentMethod);
    order.set('room_id', obj);
    order.set('totalPrice', totalPrice);
    order.save();
  });

  return 'OK';
});
Parse.Cloud.define('payment', req => {
  const order = new Order();
  // const room_id = req.params.room_id;

  // var q = new Parse.Query('Room');
  // //query
  // q.equalTo('objectId', room_id);
  // q.first().then(function (obj) {
  //   console.log(obj.attributes);

  //   order.set('isPaid', true);
  //   order.set('paidAt', Date.now());
  //   order.save();
  // });
  // const order = new Order()
  var q = new Parse.Query(Order);
  const b = q.equalTo('objectId',"r1po6q4czp" )
  const a =q.first().then((obj)=>{
    obj.set("isPaid", true)
    obj.save()
  })
  // const a = q.first()
  console.log('checking',a)
  
  
  return a;
});
Parse.Cloud.define('PAYPAL', (req, res) => {
  const arr = []
  var a = 'AaCSy0DbFkyV9Sq1WgPZEwbk_O8RMo49-2s-SNOmyrHonODbz-kY7YR-F53I5RnGNlMcNkBmLLbZmux3'
  arr.push(a)
  return arr
});
