const express = require('express')
const router = express.Router()

const questionDB = require('../models/Question.js')


router.post('/', async (req,res)=>{
    console.log(req.body)

    try{
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            user: req.body.user
        }).then(()=>{
            res.status(201).send({
                status: true,
                message:"Question added"
            })
        }).catch((err)=>{
            res.status(400).send({
                status: false,
                message: "Bad format"
            })
        })
    } catch(e){
        res.status(500)({
            status: false,
            message:"Error while adding question"
        })
    }
})


router.get('/', async (req,res)=>{
    try{
        await questionDB.aggregate([
            {
                $lookup: {
                    from:"answers",
                    localField: "_id",
                    foreignField:"questionId",
                    as: "allAnswers"
                }
            }
        ])
        .exec()
        .then((doc)=>{
            res.status(200).send(doc)
        })
        .catch((error)=>{
            res.status(500).send({
                status:true,
                message:"Unable to get ques details"
            })
        })
    }catch(e) {
        res.status(500).send({
            status:false,
            message:"Unexpected error"
        })
    }
})

module.exports = router