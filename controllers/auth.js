const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require("../modules/prisma.module");

const saltRounds = 12;

//POST - User - Sign up
router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await prisma.user.findFirst({ 
        where: {
           email: req.body.email
        },
     });
    if (userInDatabase) {
      return res.status(409).json({err: 'Email already taken.'});
    }
    
    const user = await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            hashedPassword: bcrypt.hashSync(req.body.password, saltRounds)
        }
    });

    const payload = { email: user.email, id: user.id, isAdmin: false };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//POST - User - Sign in
router.post('/sign-in', async (req, res) => {
    try {
      const user = await prisma.user.findFirst({ 
        where: {
           email: req.body.email
        },
     });
      if (!user) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password, user.hashedPassword
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }

      const payload = { email: user.email, id: user.id, isAdmin: false, name: user.name };
  
      const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

//POST - Admin - Sign up
router.post('/admin/sign-up', async (req, res) => {
  try {
    const userInDatabase = await prisma.admin.findFirst({ 
        where: {
           email: req.body.email
        },
     });
    if (userInDatabase) {
      return res.status(409).json({err: 'Email already taken.'});
    }
    
    const admin = await prisma.admin.create({
        data:{
            email: req.body.email,
            hashedPassword: bcrypt.hashSync(req.body.password, saltRounds)
        }
    });
  
    const payload = { email: admin.email, id: admin.id, isAdmin: true, name: "Admin" };
  
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


//POST - Admin - Sign in
router.post('/admin/sign-in', async (req, res) => {
    try {
      const admin = await prisma.admin.findFirst({ 
        where: {
           email: req.body.email
        },
      });
      if (!admin) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password, admin.hashedPassword
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }

      const payload = { email: admin.email, id: admin.id, isAdmin: true, name: "Admin" };
  
      const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
});

module.exports = router