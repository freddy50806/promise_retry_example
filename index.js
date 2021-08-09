// run `node index.js` in the terminal
foo();
async function foo() {
  try {
    let data = await retry(bar, 2);
    console.log(data);
  } catch (err) {
    console.log('gg', err);
  }
}

function bar() {
  return new Promise((resolve, reject) => {
    console.log('bar');
    setTimeout(() => {
      console.log('reject');
      reject('bar');
    }, 300);
  });
}

function retry(run, retryCount = 5, retryTime = 3000) {
  return new Promise((resolve, reject) => {
    run()
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        if (retryCount > 0) {
          setTimeout(() => {
            console.log(
              'retrying function ',
              run.name,
              'last ',
              retryCount,
              ' left.'
            );
            resolve(retry(run, retryCount - 1, retryTime));
          }, retryTime);
        } else {
          reject(err);
        }
      });
  });
}
