// COIN COUNTER

const coinValues = [
  { coinType: "quarter", coinValue: 25 },
  { coinType: "dime", coinValue: 10 },
  { coinType: "nickel", coinValue: 5 },
  { coinType: "penny", coinValue: 1 },
];

// reduce

const countCoinsReduce = totalCents => {
  const coinCounts = coinValues.reduce((amountsObject, coinObject) => {
    if (totalCents > coinObject.coinValue) {
      amountsObject[coinObject.coinType] = Math.floor(totalCents / coinObject.coinValue);
      totalCents = (totalCents % coinObject.coinValue);
    }
    return amountsObject;
  }, {});

  return coinCounts;
};

// recursion

function countCoinsRecursion(cents) {
  if (cents === 0) {
    return {
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0
    };
  } else {
    let coins = {};
    if (cents >= 25) {
      coins = countCoins(cents - 25);
      coins.quarters += 1;
    } else if (cents >= 10) {
      coins = countCoins(cents - 10);
      coins.dimes += 1;
    } else if (cents >= 5) {
      coins = countCoins(cents - 5);
      coins.nickels += 1;
    } else if (cents >= 1) {
      coins = countCoins(cents - 1);
      coins.pennies += 1;
    }
    return coins;
  }
};

// closure??

const countCoins = (totalCents) => {
  return (coinValue) => {
    return Math.floor(totalCents / coinValue);
  }
};

const countTotalCoins = totalCents => {
  const coinAmounts = {};
  
  coinValues.forEach(coinObject => {
    const coinTypeCount = countCoins(totalCents);
    coinAmounts[coinObject.coinType] = coinTypeCount(coinObject.coinValue);
    totalCents = totalCents % coinObject.coinValue;
  });

  return coinAmounts;
};

// SIEVE OF ERATOSTHENES

const removeMultiples = (arr, mult) => {
  return arr.filter(num => (num % mult) !== 0);
};

const getPrimesToN = n => {
  let primes = [...Array(n).keys()].slice(2, n);
  for (let i = 0; i < primes.length; i++) {
    primes = removeMultiples(primes, primes[i]);
  }
  return primes;
};


// WHITEBOARD: CLOSURES

// Use a closure to create multiple functions for adding a prefix to a name.

const addPrefix = prefix => {
  return name => {
    return `${prefix} ${name}`;
  };
};

const addPrefix2 = prefix => name => `${prefix} ${name}`;

// Use a closure to create multiple functions for making various animal noises.

const soundMaker = sound => {
  return () => {
    return `${sound.toUpperCase()}!!`;
  };
};

const soundMaker2 = sound => () => `${sound.toUpperCase()}!!`;

// Use closures to create multiple functions for adding both a prefix and a suffix to a name.

const nameEnhancer = prefix => {
  return suffix => {
    return name => {
      return `${prefix} ${name} ${suffix}`;
    };
  };
};

const nameEnhancer2 = prefix => suffix => name => `${prefix} ${name} ${suffix}`;

// Use closures to create multiple functions to first add to and then multiply a value.

const addaMult = toAdd => {
  return toMult => {
    return num => {
      return (num + toAdd) * toMult;
    }
  }
}

const addaMult2 = toAdd => toMult => num => (num + toAdd) * toMult;


// WHITEBOARD: RECURSION

// Write a recursive function that reverses the order of words in a sentence.

const reverseSentence = (sentence) => {
  if (sentence === "") {
    return "";
  } else {
    sentence = sentence.split(' ');
    return (reverseSentence(sentence.slice(1, sentence.length).join(' ')) + ' ' + sentence[0]).trim();
  }
}

// Write a recursive function that concatenates "red green refactor" to a string X number of times, where X is the argument passed into the function.

const rgr = x => {
  if (x === 0) {
    return "";
  } else {
    return rgr(x - 1) + 'red green refactor ';
  }
}

const rgr2 = x => x === 0 ? "" : rgr(x - 1) + 'red green refactor ';