const express = require("express");
const router = express.Router();
const prisma = require("../modules/prisma.module");
const verifyToken = require('../middleware/verify-token')
const verifyAdmin = require('../middleware/verify-admin')

  //POST / parks/:parkId/feedbacks
  router.post("/:parkId/feedbacks", verifyToken, async(req, res) => {
    try {
      const userId = req.user.id; // Assuming verifyToken middleware adds user object

      const newfeedback = await prisma.feedback.create({
        data: {
          subject: req.body.subject, // Assuming these field names from your schema
          text: req.body.text,
          createdAt: new Date(),
          userId: userId,
          parkId: parseInt(req.params.parkId) // Convert string to integer
        },
        // Include related user data in the response
        include: {
          user: true
        }
      });
      
      res.status(201).json(newfeedback);
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  });
  
  //READ / parks/:parkId/feedbacks
  router.get("/:parkId/feedbacks", verifyToken,verifyAdmin, async(req, res) => {
        try {
          const parkId = parseInt(req.params.parkId);
          
          const feedbacks = await prisma.feedback.findMany({
            where: {
              parkId: parkId
            },
            include: {
              user: true
            }
          })
          res.status(200).json(feedbacks);
        } catch (err) {
          res.status(500).json({ err: err.message }); // 500 Internal Server Error
        }
      });
 
    //PUT / parks/:parkId/feedbacks/:feedbackId
    // router.put("/:parkId/feedbacks/:feedbackId", verifyToken, async(req, res) => {
    //     try {
    //       const userId = req.user.id; // Assuming verifyToken middleware adds user object
          
    //       // Update the feedback
    //       const updatedfeedback = await prisma.feedback.update({
    //         where: {
    //           id: parseInt(req.params.feedbackId)
    //         },
    //         data: {
    //           subject: req.body.subject,
    //           text: req.body.text,
    //         },
    //         include: {
    //           user: true
    //         }
    //       });
          
    //       res.status(200).json(updatedfeedback);
    //     } catch(err) {
    //       res.status(500).json({ err: err.message });
    //     }
    // });

    //Delete / parks/:parkId/feedbacks/:feedbackId
    router.delete("/:parkId/feedbacks/:feedbackId", verifyToken, async(req, res) => {
        try {
          const userId = req.user.id; // Assuming verifyToken middleware adds user object
          const proposal = await prisma.feedback.findUnique({
            where: {
              id: parseInt(req.params.feedbackId)
            },
            include: {
              user: true
            }
          });
  
          if (!proposal) {
            return res.status(404).json({ err: "Feedback not found" });
          }
          
          if (proposal.userId !== userId) {
            return res.status(403).json({ err: "You don't have permission to delete this feedback" });
          }
          // Update the feedback
          const deletedfeedback = await prisma.feedback.delete({
            where: {
              id: parseInt(req.params.feedbackId)
            },
          });
          
          res.status(200).json(deletedfeedback);
        } catch(err) {
          res.status(500).json({ err: err.message });
        }
    });

module.exports = router
