import express from 'express'
import Seller from '../models/sellerSchema.js'
import bcrypt from 'bcryptjs'
const saltRounds=10;

const router=express.Router();

//POST
router.post("/",async(req,res)=>{
    try{
        console.log(req.body);
        //destructuring
        const {name,email,mob_num,password,gst,b_name}=req.body;
        //all fields required
        if(!name||!email||!password||!mob_num||!gst||!b_name){
            return res.status(400).json({message:"All fields are required"})
        }

        //email already exists
        const existingUser=await Seller.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User already exists!!"})
        }

        let c_pass=password;
        const hash=await bcrypt.hash(c_pass,saltRounds)


        const newUSer= new Seller({name,email,mob_num,password:hash,gst,b_name});

        await newUSer.save();

        res.status(201).json({message:"User registered successfully"})
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

//get function

router.get("/",async(req,res)=>{
    try{
        const rec=await Seller.find({});
        if(rec.length>0){
            return res.status(200).json(rec);
        }else{
            return res.status(400).send({message:"Data not found"})
        }
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})

//delete

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID is required to delete user" });
        }

        const deletedUser = await Seller.findByIdAndDelete(id);   

        if (!deletedUser) {
            return res.status(404).json({ message: "Seller not found" });
        }

        return res.status(200).json({
            message: "User deleted successfully!",
            deletedUser
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//block user

router.put("/block/:id", async (req, res) => {
    try {
        const seller = await Seller.findByIdAndUpdate(
            req.params.id,
            { isBlocked: true },
            { new: true }
        );

        if (!seller) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User blocked", seller });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//unblock user

    router.put("/unblock/:id",async(req,res)=>{
        try{
            const seller=await Seller.findByIdAndUpdate(
                req.params.id,
                {isBlocked:false},
                {new:true}
            );
            if(!seller){
                return res.status(404).json({message:"User no found"});
            }
            res.status(200).json({message:"User in unblocked!!",seller})
        }catch(error){
            res.status(500).json({error:error.message})
        }
    })


    //edit user

    // EDIT SELLER
router.patch("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedSeller = await Seller.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }   // returns updated document
        );

        if (!updatedSeller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.status(200).json({
            message: "Seller updated successfully",
            seller: updatedSeller
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating seller", error });
    }
});


//login

// LOGIN SELLER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Seller.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ❗ Check if seller is blocked
        if (user.isBlocked) {
            return res.status(403).json({ message: "Your account is blocked by admin" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;