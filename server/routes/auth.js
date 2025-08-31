import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


const router = express.Router()

router.post('/register', async(req, res)=> {
    try {
        const { name, email, password } = req.body
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({name, email, password:hashed})
        await user.save()
        res.json({msg:"User registered successfully...."})
    } catch(err) {
        res.status(400).json({msg:"Error registering user", error: err.message})
    }
})

router.post('/login', async(req, res)=> {
    try{
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({msg: "User not found!...."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials...."})
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.json({token, user: {id: user._id, name: user.name, email: user.email}});

            
    } catch(err) {
        res.status(400).json({msg: "Error logging in", error: err.message})
    }
})

export default router;