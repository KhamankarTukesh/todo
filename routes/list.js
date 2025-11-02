const router = require('express').Router();
const User = require("../models/user");
const List = require("../models/list");
const list = require('../models/list');


//create
router.post("/addTask", async(req,res) => {
  try {
    const { title, body, id } = req.body;

    const isExistsUser = await User.findById(id);
    if(!isExistsUser){
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({
      title,
      body,
      user: isExistsUser._id
    });

    await list.save();

    isExistsUser.list.push(list._id);
    await isExistsUser.save();

    return res.status(200).json({ message: "Task added", list });

  } catch(e){
    console.log("Error:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//update
router.put("/updateTask/:id", async(req,res) => {
  try {
    const { title, body, id } = req.body;

    // User check
    const isExistsUser = await User.findById(id);
    if(!isExistsUser){
      return res.status(404).json({ message: "User not found" });
    }

    // Check if task belongs to user
    const task = await List.findById(req.params.id);
    if(!task || task.user.toString() !== id){
      return res.status(404).json({ message: "Task not found or access denied" });
    }

    // Update task
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      updatedTask
    });

  } catch(e){
    console.log("Error:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


//Delete
router.delete("/deleteTask/:id", async(req,res) => {
  try {
    const { id } = req.body;

    // Check if user exists
    const isExistsUser = await User.findById(id);
    if(!isExistsUser){
      return res.status(404).json({ message: "User not found" });
    }

    // Check if task belongs to user
    const task = await List.findById(req.params.id);
    if(!task || task.user.toString() !== id){
      return res.status(404).json({ message: "Task not found or access denied" });
    }

    // Remove task from user's list and delete task
    await User.findByIdAndUpdate(id, {$pull: {list: req.params.id}});
    await List.findByIdAndDelete(req.params.id);

    return res.status(200).json({message: "Task Deleted!!"});

  } catch(e){
    console.log("Error:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//get task


router.get("/getTask/:id",async(req,res) =>{
  const list = await List.find({user:req.params.id}).sort({createdAt:-1});
  return res.status(200).json({ list: list});
});

module.exports = router;

