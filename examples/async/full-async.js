// this example does not block and allows all operations to complete one by one
// leveraging the example fully async across all operations.

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
  console.log("I should log first");
});

for (let i = 0; i < 10; i++) {
  await consume();
}

// I should log first
// ms 1338
// ms 1302
// ms 1310
// ms 1324
// ms 1321
// ms 1317
// ms 1220
// ms 1309
// ms 1353
// ms 1310
