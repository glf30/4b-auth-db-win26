const express = require("express");
const { createUser } = require("./usersController");
const router = express.Router();

router.post("/", async (req,res) => {
    try {
        const newUser = await createUser(req.body);
        res.json({
            message: "success",
            payload: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: "failure",
            payload: error.message
        })
    }
})

module.exports = router;