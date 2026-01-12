const User = require("./usersModel");

const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser }
