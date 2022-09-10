// this example fully blocks the main thread until complete but, all task complete one after another sequentially.

function* getData() {
  for (var i = 0; i < 1000000; i++) {
    yield i;
  }
}

function consume() {
  const set = [];
  const perf = Date.now();
  for (const j of getData()) {
    set.push(j);
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
