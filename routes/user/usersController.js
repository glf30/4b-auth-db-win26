const User = require("./usersModel");
const bcrypt = require("bcrypt");

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
            password: hashedPassword
        }

        const newUser = await User.create(secureUserData);
        const returnedUser = User.findOne({
            username: userData.username}).select("-password");
        return newUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser }