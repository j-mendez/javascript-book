// this example runs the method into the tick cycle of the event loop one by one
// applying the `await` keyword even to a non async function schedules the events
// part of the work queue on the tick async runtime counters.
// Async methods like `queueMicrotask`, `setTimeout, and `setImmediate` are ways
// to run events and scheduled based on the stack and queues.

function consume() {
  const set = [];
  const perf = Date.now();

  for (let i = 0; i < 1000000; i++) {
    set.push(i);
  }

  const timeend = Date.now() - perf;
  console.log("ms " + timeend);
}

// sets to next item after the queue
queueMicrotask(() => {
  console.log("I should log second");
});

queueMicrotask(() => {
  console.log("I should log third");
});

setTimeout(() => {
  console.log("I will log last after everything");
});

for (let i = 0; i < 10; i++) {
  await consume();
}

// ms 18
// I should log second
// ms 12
// ms 11
// ms 10
// (2) ms 9
// (2) ms 10
// ms 11
// ms 9
// 8 items (2 batched)
// I should log last
