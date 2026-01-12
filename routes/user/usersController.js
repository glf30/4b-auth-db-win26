const User = require("./usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config();

const createUser = async (userData) => {
  try {
    // 1. generate the salt
    const salt = await bcrypt.genSalt();

    // 2. encrypt the password
    // pass in the password from the request body, along with the salt
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 3. create secure user object
    // store the username along with the encrypted password inside a new object
    const secureUserData = {
      username: userData.username,
      password: hashedPassword,
    };

    const newUser = await User.create(secureUserData);

    // prevent password from being returned
    const returnedUser = await User.findOne({
      username: userData.username,
    }).select("-password");

    return returnedUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    // verify username exists/matches the one in db

    const user = await User.findOne({ 
        username: userData.username 
    });

    // if we don't find the user, throw error
    if(!user){
        throw "User not found"
    }

    // compare incoming password to the one in the DB
    // incoming: userData.password
    // db: user.password
    const isCorrectPassword = await bcrypt.compare(userData.password, user.password);

    // if passwords DONT match, throw error
    if(!isCorrectPassword){
        throw "Incorrect password"
    }

    // jwt.sign({ payload }, secretKey)
    // creates a token utilizing our user data
    // we sign the token with our data!

    // payload - data you want to store in the token (can be whatever you want!)

    // secretKey - encrypted string that we setup in our .env that is sepcific to our application.  used to verify that the token is generated from our app

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY)

    // console.log(`token: ${token}`)

    // if they do, return true!
    return token;

  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, loginUser };
