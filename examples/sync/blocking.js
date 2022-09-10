// this example fully blocks the main thread until complete one by one without letting other tasks complete.

function consume() {
  const set = [];
  const perf = Date.now();
  for (let i = 0; i < 1000000; i++) {
    set.push(i);
  }
  const timeend = Date.now() - perf;
  console.log("ms " + timeend);
}

queueMicrotask(() => {
  console.log("I should log last");
});

for (let i = 0; i < 10; i++) {
  consume();
}
