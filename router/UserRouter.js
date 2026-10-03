const express = require ("express");
const { createUser, loginUser } = require("../controllers/UserController");
const router = express.Router()

router.post("/registerUser", createUser)
router.post("/login", loginUser)









module.exports = router;