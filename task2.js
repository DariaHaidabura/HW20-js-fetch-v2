console.log('------------- #6')
console.log(1);
 
setTimeout(function () {
  console.log(2);
}, 100);
 
setTimeout(function () {
  console.log(3);
}, 0);
 
setTimeout(function () {
  new Promise(function (resolve) {
    resolve();
  }).then(() => {
    console.log(4);
  });
}, 0);
 
console.log(5);

//1 5 3 4 2 
