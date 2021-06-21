function getRandomNumber(amount) {
  let returnArray = "";
  for (let i = 0; i < amount; i++) {
    let number = Math.floor(Math.random() * 10);
    returnArray = returnArray + number.toString();
  }
  return returnArray;
}

module.exports = getRandomNumber;
