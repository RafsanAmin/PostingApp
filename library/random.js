/* eslint-disable no-plusplus */
const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "_",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "W",
  "X",
  "Y",
  "Z",
];
const getRandomNumber = (amount) => {
  let returnArray = "";
  for (let i = 0; i < amount; i++) {
    const number = Math.floor(Math.random() * 10);
    returnArray += number.toString();
  }
  return returnArray;
};
const getRandomString = (amount) => {
  let returnString = "";
  if (amount > 500) {
    return "too big";
  }
  for (let i = 0; i < amount; i++) {
    const string = chars[Math.floor(Math.random() * chars.length)];
    returnString += string;
  }
  return returnString;
};
module.exports = { getRandomNumber, getRandomString };
