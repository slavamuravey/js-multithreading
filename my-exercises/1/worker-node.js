const { parentPort } = require('worker_threads');

parentPort.on('message', (buffer) => {
  const ITERATIONS = 1000;
  const view = new Int32Array(buffer);
  for (let i = 0; i < ITERATIONS; i++) {
    view[0]++;
  }

  parentPort.postMessage(true);
});
