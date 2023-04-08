const coinValues = [
  { coinType: "quarter", coinValue: 25 },
  { coinType: "dime", coinValue: 10 },
  { coinType: "nickel", coinValue: 5 },
  { coinType: "penny", coinValue: 1 },
];

const countCoinsReduce = totalCents => {
  const coinCounts = coinValues.reduce((amountsObject, coinObject) => {
    if (totalCents > coinObject.coinValue) {
      amountsObject.push({
        coinType: coinObject.coinType,
        coinAmount: Math.floor(totalCents / coinObject.coinValue),
      });
      totalCents = (totalCents % coinObject.coinValue);
    }
    return amountsObject;
  }, []);

  return coinCounts;
}

