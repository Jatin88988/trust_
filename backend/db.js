const mongoose = require('mongoose')


const url="mongodb+srv://jatin8898:Jatin123@cluster0.5i21g.mongodb.net/?retryWrites=true&w=majority"


module.exports.connect=()=>{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Successfully connected with mongodb')
    }).catch((error)=>console.log(error))
}
