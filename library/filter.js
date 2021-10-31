const censor = ['@', '?', '!', '#', '*'];

const censorFilter = /(ass|shit|fuck|sex|bitch|motherfucker|dick|boobs|booty|tits|asshole|thot)/gi;

const wordFilter = (text) => {
  let re = text.replace(censorFilter, (a) => {
    return a.replace(/[a-z]/gi, censor[Math.floor(Math.random() * censor.length)]);
  });
  return re;
};
const wordIncludes = (text) => {
  let re = text.match(censorFilter);
  return re;
};
module.exports = { wordFilter, wordIncludes };
