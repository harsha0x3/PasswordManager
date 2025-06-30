const generatePassword = (
  length,
  includeUpperCase,
  includeLowerCase = true,
  includeNums,
  includeSpecialChars
) => {
  const lowers = "abcdefghijklmopqrstuvwxyz";
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "1234567890";
  const specialChars = "~`!@#$%^&*()_-+=][{};:'\"/?.>,<|\\";
  let password = "";
  let passwordString = "";
  if (includeLowerCase) {
    passwordString += lowers;
  }

  if (includeUpperCase) {
    passwordString += uppers;
  }
  if (includeNums) {
    passwordString += nums;
  }
  if (includeSpecialChars) {
    passwordString += specialChars;
  }
  const len = passwordString.length;

  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * len);
    password += passwordString.charAt(index);
  }
  return password;
};

export default generatePassword;
