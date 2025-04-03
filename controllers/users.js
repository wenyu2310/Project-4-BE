const express = require("express");
const router = express.Router();
const prisma = require("../modules/prisma.module");
const verifyToken = require('../middleware/verify-token')

router.get("/", async (req, res) => {
  try {
    const user = await prisma.User.findMany()
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message }); // 500 Internal Server Error
  }
});

module.exports = router
 
