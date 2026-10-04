const express = require ("express");
const refreshToken = require("../controllers/TokenController");
const router = express.Router();

router.post("/generateToken", refreshToken)

module.exports = router