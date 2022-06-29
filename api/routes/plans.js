const router = require("express").Router();
const User = require("../models/User");
const Plan = require("../models/Plan");

//CREATE PLAN
router.post("/", async (req, res) => {
  const newPlan = new Plan(req.body);
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PLAN
router.put("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (plan.username === req.body.username) {
      try {
        const updatedPlan = await Plan.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPlan);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your workout plan!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PLAN
router.delete("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (plan.username === req.body.username) {
      try {
        await plan.delete();
        res.status(200).json("Workout plan has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your workout plan!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PLAN
router.get("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PLANS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const sort = req.query.sort;
  try {
    let plans;

    if (username) {
      if (catName) {
        if (sort) {
          if (sort === "alphabetical") {
            plans = await Plan.find({
              username,
              categories: {
                $in: [catName],
              },
            }).sort({ title: 1 });
          } else if (sort === "recent") {
            plans = await Plan.find({
              username,
              categories: {
                $in: [catName],
              },
            }).sort({ createdAt: -1 });
          } else {
            plans = await Plan.find({
              username,
              categories: {
                $in: [catName],
              },
            }).sort({ likeCount: -1 });
          }
        } else {
          plans = await Plan.find({
            username,
            categories: {
              $in: [catName],
            },
          });
        }
      } else {
        if (sort) {
          if (sort === "alphabetical") {
            plans = await Plan.find({
              username,
            }).sort({ title: 1 });
          } else if (sort === "recent") {
            plans = await Plan.find({
              username,
            }).sort({ createdAt: -1 });
          } else {
            plans = await Plan.find({
              username,
            }).sort({ likeCount: -1 });
          }
        } else {
          plans = await Plan.find({
            username,
          });
        }
      }
    } else {
      if (catName) {
        if (sort) {
          if (sort === "alphabetical") {
            plans = await Plan.find({
              categories: {
                $in: [catName],
              },
            }).sort({ title: 1 });
          } else if (sort === "recent") {
            plans = await Plan.find({
              categories: {
                $in: [catName],
              },
            }).sort({ createdAt: -1 });
          } else {
            plans = await Plan.find({
              categories: {
                $in: [catName],
              },
            }).sort({ likeCount: -1 });
          }
        } else {
          plans = await Plan.find({
            categories: {
              $in: [catName],
            },
          });
        }
      } else {
        if (sort) {
          if (sort === "alphabetical") {
            plans = await Plan.find().sort({ title: 1 });
          } else if (sort === "recent") {
            plans = await Plan.find().sort({ createdAt: -1 });
          } else {
            plans = await Plan.find().sort({ likeCount: -1 });
          }
        } else {
          plans = await Plan.find();
        }
      }
    }

    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;