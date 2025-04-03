const express = require("express");
const router = express.Router();
const prisma = require("../modules/prisma.module");
const verifyToken = require('../middleware/verify-token')

  //POST / parks/:parkId/proposals
  router.post("/:parkId/proposals", verifyToken, async(req, res) => {
    try {
      const userId = req.user.id; // Assuming verifyToken middleware adds user object

      const newProposal = await prisma.proposal.create({
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
      
      res.status(201).json(newProposal);
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  });
  //READ / parks/:parkId/proposals
  router.get("/:parkId/proposals", verifyToken, async(req, res) => {
        try {
          const proposals = await prisma.proposal.findMany()
          res.status(200).json(proposals);
        } catch (err) {
          res.status(500).json({ err: err.message }); // 500 Internal Server Error
        }
      });
 
      router.get("/:parkId/proposals/:proposalId",verifyToken, async (req,res) =>{
        try {
            const proposal = await prisma.proposal.findFirst(
                { 
                    where: {
                       id: parseInt(req.params.proposalId)
                    }, 
                    include: {
                      park: true,
                      user:true
                    }
                 });
            res.status(200).json(proposal)
        } catch(err) {
            res.status(500).json({ err:err.message})
        }
    })
    //PUT / parks/:parkId/proposals/:proposalId
    router.put("/:parkId/proposals/:proposalId", verifyToken, async(req, res) => {
      try {
        const userId = req.user.id;
        
        const proposal = await prisma.proposal.findUnique({
          where: {
            id: parseInt(req.params.proposalId)
          },
          include: {
            user: true
          }
        });

        if (!proposal) {
          return res.status(404).json({ err: "Proposal not found" });
        }
        
        if (proposal.userId !== userId) {
          return res.status(403).json({ err: "You don't have permission to edit this proposal" });
        }
        
        const updatedProposal = await prisma.partnershipProposal.update({
          where: {
            id: parseInt(req.params.proposalId)
          },
          data: {
            subject: req.body.subject,
            text: req.body.text,
          },
          include: {
            user: true
          }
        });
        
        res.status(200).json(updatedProposal);
      } catch(err) {
        res.status(500).json({ err: err.message });
      }
  });

    //Delete / parks/:parkId/proposals/:proposalId
    router.delete("/:parkId/proposals/:proposalId", verifyToken, async(req, res) => {
        try {
          const userId = req.user.id; // Assuming verifyToken middleware adds user object
          
          const proposal = await prisma.proposal.findUnique({
            where: {
              id: parseInt(req.params.proposalId)
            },
            include: {
              user: true
            }
          });
  
          if (!proposal) {
            return res.status(404).json({ err: "Proposal not found" });
          }
          
          if (proposal.userId !== userId) {
            return res.status(403).json({ err: "You don't have permission to delete this proposal" });
          }
          const deletedProposal = await prisma.proposal.delete({
            where: {
              id: parseInt(req.params.proposalId)
            },
          });
          
          res.status(200).json(deletedProposal);
        } catch(err) {
          res.status(500).json({ err: err.message });
        }
    });

  //READ / parks/:parkId/proposals/likes
  router.get("/:parkId/proposals/:proposalId/likes", verifyToken, async(req, res) => {
    try {
      const proposals = await prisma.like.findMany()
      res.status(200).json(proposals);
    } catch (err) {
      res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
  });

  //POST / parks/:parkId/:proposalId/likes
  router.post("/:parkId/proposals/:proposalId/likes", verifyToken, async(req, res) => {
    try {
      const userId = req.user.id; // Assuming verifyToken middleware adds user object

      const newlike = await prisma.like.create({
        data: {
          createdAt: new Date(),
          userId: userId,
          proposalId: parseInt(req.params.proposalId)
        },
        include: {
          user: true
        }
      });
      
      res.status(201).json(newlike);
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  });

   //DELETE / parks/:parkId/:proposalId/likes/:likeId
  router.delete("/:parkId/proposals/:proposalId/likes/:likeId", verifyToken, async(req, res) => {
    try {
      const userId = req.user.id; // Assuming verifyToken middleware adds user object
      
      const liker = await prisma.like.findUnique({
        where: {
          id: parseInt(req.params.likeId)
        },
        include: {
          user: true
        }
      });

      if (!liker) {
        return res.status(404).json({ err: "Person in mailing list not found" });
      }
      
      if (liker.userId !== userId) {
        return res.status(403).json({ err: "You don't have permission to delete this like" });
      }
      const deletedliker = await prisma.like.delete({
        where: {
          id: parseInt(req.params.likeId)
        },
      });
      
      res.status(200).json(deletedliker);
    } catch(err) {
      res.status(500).json({ err: err.message });
    }
});
module.exports = router
