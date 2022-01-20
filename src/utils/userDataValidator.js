/* eslint-disable no-bitwise */
import { mailRegexp } from './stringRegexp';

export default function userDataValidator(data) {
  return new Promise((resolve, reject) => {
    const { work, bio, username, email, pass, confPass, verification } = data;
    console.log('Hey!', data);
    if (!email.match(mailRegexp) || email === '') {
      reject('Invalid Email Address!');
    } else if (
      email?.length > 64 ||
      username?.length > 64 ||
      pass?.length > 64 ||
      confPass?.length > 64 ||
      work?.length > 64 ||
      bio?.length > 250
    ) {
      reject('Bio must be less than 250 and others must be less than 64 characters');
    } else if (username === '' || email === '') {
      reject('Username and email must not be empty');
    } else if (!(verification ^ (pass < 8 || pass === null)) && pass !== null) {
      reject('Password too short!');
    } else if (pass !== confPass) {
      reject("Passwors and confirm password aren't same");
    } else {
      resolve(true);
    }
  });
}