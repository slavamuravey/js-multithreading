self.onmessage = ({data: buffer}) => {
  const ITERATIONS = 1000;
  const view = new Uint32Array(buffer);
  for (let i = 0; i < ITERATIONS; i++) {
    view[0]++;
  }

  postMessage(true);
};
