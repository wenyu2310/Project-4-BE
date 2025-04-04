const express = require("express");
const router = express.Router();
const prisma = require("../modules/prisma.module");
const verifyToken = require('../middleware/verify-token')

router.get("/", verifyToken, async (req, res) => {
    try {
      const parks = await prisma.park.findMany()
      res.status(200).json(parks);
    } catch (err) {
      res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
  });
  router.get("/all-proposals", verifyToken, async(req, res) => {
    try {
  
      const proposals = await prisma.proposal.findMany({
        include: {
          user: true,
          park: true
        }
      });
      
      res.status(200).json(proposals);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  

  router.get("/:parkId",verifyToken, async (req,res) =>{
    try {
        const park = await prisma.park.findFirst(
            { 
                where: {
                   id: parseInt(req.params.parkId)
                }, 
                include: {
                  proposals: {
                    include: {
                      user: true // This includes the user associated with each proposal
                    }
                  }
                }
             });
        res.status(200).json(park)
    } catch(err) {
        res.status(500).json({ err:err.message})
    }
})

router.post("/", verifyToken, async(req, res) => {
  try {
    const userId = req.user.id; // Assuming verifyToken middleware adds user object

    const newPark = await prisma.park.create({
      data: {
        name: req.body.name, // Assuming these field names from your schema
        description: req.body.description,
        targetCompletion: new Date(req.body.targetCompletion), // Convert to Date object
        status: parseInt(req.body.status),
        plan:req.body.plan,
        perspective:req.body.perspective,
        stage: String(req.body.stage)
  
      },
      // Include related user data in the response
      // include: {
      //   user: true
      // }
    });
    
    res.status(201).json(newPark);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
});

//PUT / parks/:parkId/proposals/:proposalId
router.put("/:parkId", verifyToken, async (req, res) => {
  try {
    
    const park = await prisma.park.findUnique({
      where: {
        id: parseInt(req.params.parkId),
      },

    });

    if (!park) {
      return res.status(404).json({ err: "Park not found" });
    }

    const updatedPark = await prisma.park.update({
      where: {
        id: parseInt(req.params.parkId),
      },
      data: {
        name: req.body.name, // Assuming these field names from your schema
        description: req.body.description,
        targetCompletion: new Date(req.body.targetCompletion), // Convert to Date object
        status: parseInt(req.body.status),
        plan:req.body.plan,
        perspective:req.body.perspective,
        stage: req.body.stage
      },
    });

    res.status(200).json(updatedPark);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete("/:parkId", verifyToken, async (req, res) => {
    try {
      const userId = req.user.id; // Assuming verifyToken middleware adds user object

      const park = await prisma.park.findUnique({
        where: {
          id: parseInt(req.params.parkId),
        },
   
      });

      if (!park) {
        return res.status(404).json({ err: "Park not found" });
      }

      const deletedPark = await prisma.park.delete({
        where: {
          id: parseInt(req.params.parkId),
        },
      });

      res.status(200).json(deletedPark);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }
);
  module.exports = router
 