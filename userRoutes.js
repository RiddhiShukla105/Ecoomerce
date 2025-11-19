import express from "express";
import Sign from "../models/signSchema.js";
import bcrypt from 'bcryptjs'
const saltRounds=10;

const router = express.Router();

//get function

router.get("/sign",async(req,res)=>{
    try{
        const rec=await Sign.find({});
         if (rec.length > 0) {
      return res.status(200).json(rec);
    }
        else{
            return res.status(404).send({message:'Data not found'})
        }

    } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

//post function



//POST route (save user)
router.post("/sign", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

     // if email already exists
    const existingUser = await Sign.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    let c_pass=password;
    const hash = await bcrypt.hash(c_pass, saltRounds);

    // console.log(hash);

    const newUser = new Sign({ name, email, password:hash });

    
    

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // console.error("Error saving user:", error);
    res.status(500).json({ error: error.message });
  }
});

//delete

router.delete("/sign/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const user=await Sign.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({message:'Uer not found'})
    }
    return res.status(200).json({message:'USer is deleted'})

  }catch(error){
    return res.status(500).json({error:error.message})
  }
})

//block

router.put("/sign/block/:id", async (req, res) => {
  try {
    const user = await Sign.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User blocked", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//unblock
router.put("/sign/unblock/:id",async(req,res)=>{
  try{
    const user=await Sign.findByIdAndUpdate(
      req.params.id,
      {isBlocked:false},
      {new:true}
    );
    if(!user) return res.status(404).json({message:"User not found"});
    return res.status(200).json({message:"User unblocked",user});
  }catch(error){
    res.status(500).json({error:error.message})
  }
})

export default router;



