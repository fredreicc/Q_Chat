const public_key = () => {
  let sk = [];
  let sk_t = [];
  let pk = [];
  let pk_t = [];
  let A = [];
  let prime = 1523;

  function generateUniqueRandomNumbers(min, max, count) {
    if (count > max - min + 1) {
      console.error("Cannot generate more unique random numbers than the range allows.");
      return [];
    }

    let resultVector = [];
    while (resultVector.length < count) {
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!resultVector.includes(randomNum)) {
        resultVector.push(randomNum);
      }
    }
    return resultVector;
  }

  function secret_key_gen() {
    sk = generateUniqueRandomNumbers(10, 200, 128);
    // rng.generateRandomUniqueNumbers1();

    sk_t = generateUniqueRandomNumbers(1, 120, 25);
    // rng1.generateRandomUniqueNumbers();
  }

  function public_key_gen() {
    pk = generateUniqueRandomNumbers(1, 200, 128);
    // rng2.generateRandomUniqueNumbers1();

    A = generateUniqueRandomNumbers(1, 500, 200);
    // rng3.generateRandomUniqueNumbers();

    let res = 0;
    let jj = 0,
      temp = 0;
    for (let i = 0; i < pk.length; i++) {
      if (i === sk_t[jj]) {
        jj++;
        continue;
      }
      res += pk[i] * sk[i];
    }
    pk_t.push(((res % prime) + (temp % prime)) % prime);
    res = 0;
    for (let i = 1; i < A.length; i++) {
      let x = 0,
        xx = 0;
      for (let j = 0; j < pk.length; j++) {
        if (j === sk_t[xx]) {
          xx++;
          continue;
        }
        res += (pk[j] | A[i]) * sk[j];
      }
      pk_t.push(res + x);
      res = 0;
    }

    let err = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    let j = 0;
    for (let i = 0; i < pk_t.length; i++) {
      pk_t[i] = (pk_t[i] + err[j++]) % prime;
      if (j === 10) j = 0;
    }
    console.log("pk vector:");
    return { pk: pk, pk_t: pk_t, A: A };
  }

  secret_key_gen();
  let ar = public_key_gen();
  return ar;
};
module.exports = public_key;
