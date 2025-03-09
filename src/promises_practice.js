console.log("this", this);
const cart = ["shoe", "socks", "belt", "tshirt"];

function validateCart(cart) {
  return true;
}

function validateOrderId(orderId) {
  return true;
}

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("cart is invalid");
      reject(err);
    }

    const orderId = "1234";
    resolve(orderId);
  });

  return pr;
}

function createPayment(orderId) {
  const promisesPay = new Promise(function (resolve, reject) {
    if (!validateOrderId(orderId)) {
      const err = new Error("order Id is invalid");
      reject(err);
    }

    const paymentnumber = "sdfdjfd";
    resolve(paymentnumber);
  });

  return promisesPay;
}

const promise = createOrder(cart);

promise
  .then(function (orderId) {
    console.log("orderId:", orderId);
    return createPayment(orderId);
  })
  .then(function (paymentnumber) {
    console.log("payment number", paymentnumber);
    return paymentnumber;
  })
  .then(function (paymentnumber) {
    console.log("final payment number", paymentnumber);
  })
  .catch(function (err) {
    console.error("error is", err);
  })
  .then(function () {
    console.log("will be called always");
  });

const p2 = new Promise((resolve, reject) => {
  setInterval(() => {
    reject("p2 error");
  }, 3000);
});

const p1 = new Promise((resolve, reject) => {
  setInterval(() => {
    resolve("p1 success");
  }, 3000);
});

const p3 = new Promise((resolve, reject) => {
  setInterval(() => {
    reject("p3 error");
  }, 3000);
});

Promise.all([p1, p2, p3])
  .then(
    (res) => {
      console.log("res all", res);
    },
    (error) => {
      console.log("error from second argument of then", error);
    }
  )
  .catch((err) => {
    console.error("error in operation", err);
  });

Promise.allSettled([p1, p2, p3])
  .then((res) => {
    console.log("res allsettled", res);
  })
  .catch((err) => {
    console.log("error in operation", err);
  });

Promise.race([p1, p2, p3])
  .then((res) => {
    console.log("res race", res);
  })
  .catch((err) => {
    console.error("error in operation race", err);
  });

Promise.any([p1, p2, p3])
  .then((res) => {
    console.log("res in operation any", res);
  })
  .catch((err) => {
    console.log("err in operation any", err);
  });

//finally block benefit is it always gets executed if catch bloack has error then also.
//code ouside try catch will not execute always as we can see below.

async function handlepromiseall() {
  try {
    const res = await Promise.all([p1, p2, p3]);
    console.log("res final", res);
  } catch (err) {
    console.error("error final", errg);
  } finally {
    console.log("final block");
  }
  console.log("end code");
}

handlepromiseall();
