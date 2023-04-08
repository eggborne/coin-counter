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
}

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
}

// closure

const countCoins = (totalCents) => {
  return (coinValue) => {
    return Math.floor(totalCents / coinValue);
  }
}

const countTotalCoins = totalCents => {
  const coinAmounts = {};
  
  coinValues.forEach(coinObject => {
    const coinTypeCount = countCoins(totalCents);
    coinAmounts[coinObject.coinType] = coinTypeCount(coinObject.coinValue);
    totalCents = totalCents % coinObject.coinValue;
  });

  return coinAmounts;
}


