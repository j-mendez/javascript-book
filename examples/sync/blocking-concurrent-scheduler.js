// this example fully blocks the main thread until complete and demonstrates the Schedule API [https://developer.mozilla.org/en-US/docs/Web/API/Scheduler] and waits for all task complete one after another sequentially.
// This example yields to other events that are mid process in the queue.
// The schedule API processes the task last when nothing else is left to do made for authors to build javascript that prevents blocking the UI.

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

if ("scheduler" in this) {
  scheduler.postTask(() => {
    console.log("log last");
  });
}

queueMicrotask(() => {
  console.log("I should log second");
});

for (let i = 0; i < 20; i++) {
  consume();
}

console.log("log before postTask and queueMicrotask");
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
