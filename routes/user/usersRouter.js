const express = require("express");
const { createUser, loginUser } = require("./usersController");
const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

// can only access profile if you are logged in with your token
// we can add middleware functions between our "url_route" and callback as parameters
// we will attempt to verify our user before we hit the route
router.get("/profile", verifyToken, (req, res) => {
  try {
    res.json({
        message: "success",
        payload: `Successfully Verified Token for ${req.username}`
    })
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json({
      message: "success",
      payload: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // const userLoggedIn = await loginUser(req.body);
    // res.json({
    //     message: "success",
    //     payload: `${userLoggedIn.username} Successfully logged in`
    // })
    const token = await loginUser(req.body);
    res.json({
      message: "success",
      payload: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error,
    });
  }
});

module.exports = router;
