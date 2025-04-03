const express = require("express");
const router = express.Router();
const prisma = require("../modules/prisma.module");
const verifyToken = require('../middleware/verify-token')
const verifyAdmin = require('../middleware/verify-admin')


  //POST / parks/:parkId/mailingList
  router.post("/:parkId/mailinglist", verifyToken, async(req, res) => {
    try {
      const userId = req.user.id; // Assuming verifyToken middleware adds user object

      const newmailer = await prisma.mailingList.create({
        data: {
          createdAt: new Date(),
          userId: userId,
          parkId: parseInt(req.params.parkId) 
        },
        include: {
          user: true
        }
      });
      
      res.status(201).json(newmailer);
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  });
  
  //READ / parks/:parkId/mailingList
  router.get("/:parkId/mailingList", verifyToken, verifyAdmin,async(req, res) => {
        try {
          const parkId = parseInt(req.params.parkId);
          const mailingLists = await prisma.mailingList.findMany({
            where: {
              parkId: parkId
            },
            include: {
              user: true
            }
          })
          res.status(200).json(mailingLists);
        } catch (err) {
          res.status(500).json({ err: err.message }); // 500 Internal Server Error
        }
      });

    //Delete / parks/:parkId/mailingList/:mailingListId
    router.delete("/:parkId/mailingList/:mailingListId", verifyToken,verifyAdmin, async(req, res) => {
        try {
          const userId = req.user.id; // Assuming verifyToken middleware adds user object
          
          const mailer = await prisma.mailingList.findUnique({
            where: {
              id: parseInt(req.params.mailingListId)
            },
            include: {
              user: true
            }
          });
  
          if (!mailer) {
            return res.status(404).json({ err: "Person in mailing list not found" });
          }
          
          if (mailer.userId !== userId) {
            return res.status(403).json({ err: "You don't have permission to remove this person from the mailing list" });
          }
          const deletedmailer = await prisma.mailingList.delete({
            where: {
              id: parseInt(req.params.mailingListId)
            },
          });
          
          res.status(200).json(deletedmailer);
        } catch(err) {
          res.status(500).json({ err: err.message });
        }
    });

module.exports = router
