// this example does not block and allows all operations to fire and complete
// concurrently. The operations are fire and forget where the scheduling will
// yields allowing the time of each operation to be almost identical.
// It may appear as things are running in parallel but, the time executes
// in seconds that Date.now has reduced precision.

function* getData() {
  for (var i = 0; i < 1000000; i++) {
    yield i;
  }
}

async function consume() {
  const set = [];
  const perf = Date.now();

  for await (const j of getData()) {
    set.push(j);
  }

  const timeend = Date.now() - perf;
  console.log("ms " + timeend);
}

queueMicrotask(() => {
  console.log("I should log soon");
});

for (let i = 0; i < 10; i++) {
  consume();
}

// I should log soon
// (10) ms 13109
