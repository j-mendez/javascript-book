// this example fully blocks the main thread until complete but, all task complete one after another sequentially.
// This example yields to other events that are mid process in the queue.

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

for (let i = 0; i < 20; i++) {
  consume();
}

console.log("log before queueMicrotask");

// ms 40
// ms 24
// ms 21
// ms 28
// ms 24
// ms 25
// (5)  ms 20
// ms 21
// (4) ms 21
// ms 21
// (3) ms 20
// I should log last
