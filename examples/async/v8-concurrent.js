const delay = () => {
  return new Promise((resolve) => {
    console.log(Date.now());
    resolve(true);
  });
};

const _getWhile = async (page = 0) => {
  if (page < 100) {
    console.log("running - " + page);
    // without the delay the promise will run one full to completion instead of switching
    // resolution with await delay (0-3) - without delay (0-10) slower.
    await delay();
    return await _getWhile(page + 2);
  }
};

await Promise.all([_getWhile(0), _getWhile(1)]);
