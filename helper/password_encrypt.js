const { compare, hash, genSalt }= require("bcrypt") ;

// encrytping password
const encrptyPassword = async (text) => {
  const salt = await genSalt(10);
  const password = await hash(text, salt);
  return password;
};
// decrytping password
const decrptyPassword = async (incomeText, hashText) => {
  const password = await compare(incomeText, hashText);
  return password;
};

module.exports = { encrptyPassword, decrptyPassword };
