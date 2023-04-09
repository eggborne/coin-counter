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


// MODAY LESSON ////////////////////////////////////////////

// Create a reusable function that we can use to hydrate(), feed() and giveLight() to a plant. 
// Specifically, we will create a pure function that isn't in a class. Because it will be pure, it will have:

// No side effects
// No state mutation
// A return value

const hydrate1 = (plant) => {
  return {
    ...plant,
    water: (plant.water || 0) + 1
  }
};

const feed1 = (plant) => {
  return {
    ...plant,
    soil: (plant.soil || 0) + 1
  }
};

// combine feed/plant:

const changePlantState = (plant, property) => {
  return {
    ...plant,
    [property]: (plant[property] || 0) + 1
  }
}

const changeState1 = (state, prop, value) => ({
  ...state,
  [prop] : (state[prop] || 0) + value
})

// curried:

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feed = changeState("soil");
const hydrate = changeState("water");
const giveLight = changeState("light");

feed(5)(plant);

const blueFood = changeState("soil")(5);
const greenFood = changeState("soil")(10);
const yuckyFood = changeState("soil")(-5);

blueFood(plant);

// Our function is pure, does not mutate state, and has no side effects
// Our function is unary and takes only one argument
// Our function uses currying, which allows us to reuse it as a function factory
// Our function takes advantage of closures (because we wouldn't be able to curry without it)
// Our function is sufficiently abstracted that it could be used with other types of objects that could be incremented or decremented as well

// STORING STATE IN A FUNCTION

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// The only job of the outer function is to store the currentState of an object
// The currentState of an object will be initialized as a {}
// Our outer function returns an anonymous inner function that takes one parameter called stateChangeFunction. This inner function will take a function as an argument
// The line const newState = stateChangeFunction(currentState); will take the function we pass in as an argument and then call it on currentState
// Instead of mutating currentState, we will save the new state in a constant called newState
// We will make a copy of newState and assign it to currentState
// (similar to what React does with its setState() method)
// Finally, our inner function will return the newState

const stateControl = storeState();
 // Here, we are actually invoking the storeState() function and creating a closure over the currentState variable in the outer function

 const fedPlant = stateControl(blueFood);