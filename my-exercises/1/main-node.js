const { Worker } = require('worker_threads');

const THREADS = 40;

const buffer = new SharedArrayBuffer(32);
const view = new Uint32Array(buffer);

const promises = [];

for (let i = 0; i < THREADS; i++) {
  const worker = new Worker(__dirname + '/worker-node.js');
  const p = new Promise((resolve, reject) => {
    worker.on('message', msg => {
      if (msg === true) {
        resolve();
      } else {
        reject();
      }
    });
  });
  p.then(() => {
    worker.unref();
  });
  promises.push(p);
  worker.postMessage(buffer);
}

Promise.allSettled(promises).finally(() => {
  console.log("result", view[0]);
});


