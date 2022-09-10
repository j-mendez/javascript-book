// this example does not block and allows all operations to complete parallel.
// all operations will complete exactly at the same time.

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
  console.log("I will log first");
});

for (let i = 0; i < 10; i++) {
  // batched tasked may be part of the same tick
  queueMicrotask(consume);
  queueMicrotask(consume);
}

setTimeout(() => {
  console.log("I will log last");
});

// I should log first
// (10) ms 12000
