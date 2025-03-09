const p2 = new Promise((resolve, reject) => {
  setInterval(() => {
    reject("p2 error");
  }, 8000);
});

p2.catch((err) => {
  console.log("error in p2", err);
});

const p1 = new Promise((resolve, reject) => {
  setInterval(() => {
    resolve("p1 success");
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  setInterval(() => {
    reject("p3 error");
  }, 3000);
});

p3.catch((err) => {
  console.log("error in p3", err);
});

async function handlePromises() {
  const data = await p1;
  console.log("hellp from p1", data);

  const dataval = await p2;
  console.log("hello from p2", dataval);
}

handlePromises().catch((err) => {
  console.error("error in operation", err);
});
