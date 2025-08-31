import express from 'express'
import Expense from '../models/Expense.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/', authMiddleware, async(req, res)=> {
    try{
        const {amount, category, description} = req.body
        const expense = new Expense({
            userId: req.user,
            amount,
            category,
            description
        });
        await expense.save()
        res.json(expense)

    } catch(err) {
        res.status(400).json({msg:"Error adding expense", error: err.message})
    }
})

router.get('/', authMiddleware, async(req, res)=> {
    try{
        const expenses = await Expense.find({userId: req.user}).sort({date: -1})
        res.json(expenses)

    }catch(err) {
        res.status(400).json({msg:"Error fetching expenses", error: err.message})
    }
})

router.delete('/:id', authMiddleware, async(req, res)=> {
    try{
        await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user})
        res.json({msg: "Expense deleted...."})
    }catch(err) {
        res.status(400).json({msg: "Error deleting expense", error: err.message})
    }
})

router.put("/:id", async(req,res)=> {
    try{
        const {category, description, amount} = req.body
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {category, description, amount},
            {new: true}
        )
        res.json(expense)
    }catch(err) {
        res.status(500).json({msg: "Server error"})
    }
})


export default router;