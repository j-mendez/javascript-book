// this example does not block and allows all operations to complete one by one
// except the queueMicroTask gets moved to the second operation in the engine
// tick cycle. This example leverages the engines internal async runtime for
// determining the execution cycle.

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
  console.log("I should log second");
});

for (let i = 0; i < 10; i++) {
  await consume();
}

// ms 50
// I should log second
// (2) ms 30
// ms 28
// (2) ms 26
// (2) ms 25
// ms 26
// ms 24
// 10 items (3 items batched)
