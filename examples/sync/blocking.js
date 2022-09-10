// This example fully blocks the main thread until complete one by one without letting other tasks complete.
// The CPU is running as fast as possible without letting any other operations complete.

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

for (let i = 0; i < 20; i++) {
  consume();
}

// ms 14
// ms 9
// (2)  ms 7
// ms 10
// ms 7
// (6)  ms 6
// ms 7
// ms 9
// (3) ms 5
// ms 4
// (2) ms 5
// I should log last
