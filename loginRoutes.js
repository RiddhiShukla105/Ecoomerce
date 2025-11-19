import dotenv from "dotenv";
dotenv.config();


import express from 'express';
import Sign from '../models/signSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const jwtsecret="9999777ggvv666nhhhhh";


const router=express.Router();


router.get('/check', (req, res) => {
  res.send('Login route working');
});

router.post('/login',async(req,res)=>{
     const {email,password}=req.body;
    try{
       //user exits
        const user=await Sign.findOne({email});
        // const recpass=await Login.findOne({'password':password})
        if(!user){
            return res.status(404).send({message:'User does not exists!!'})
        }
        // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password!' });
    }
    if (user.isBlocked) {
  return res.status(403).json({ message: "Your account is blocked by admin" });
}
        // Generate JWT token
    // const payload = { uid: user._id };
    // const token = jwt.sign(payload, jwtsecret, { expiresIn: '1h' });

     // Use same secret from .env
    const payload = { userId: user._id };            // <<-- changed to userId
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
        
        //Login success
        // return res.status(200).json({message:'Login successfull!'})
    }catch(err){
        console.log(err)

    }
})
export default router;