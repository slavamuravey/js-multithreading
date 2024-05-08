if (!crossOriginIsolated) {
  throw new Error('Cannot use SharedArrayBuffer');
}

const THREADS = 40;

const buffer = new SharedArrayBuffer(32);
const view = new Uint32Array(buffer);

const promises = [];

for (let i = 0; i < THREADS; i++) {
  const worker = new Worker('worker.js');
  const p = new Promise((resolve, reject) => {
    worker.onmessage = msg => {
      if (msg === true) {
        resolve();
      } else {
        reject();
      }
    };
  });
  promises.push(p);
  worker.postMessage(buffer);
}

Promise.allSettled(promises).then(() => {
  console.log("result", view[0]);
});
