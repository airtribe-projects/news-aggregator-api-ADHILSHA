const mongoose=require('mongoose')
const dbConnection= mongoose.connect(process.env.MONGO_URI)
.then((value)=>{
    console.log('Db connected Successfully!')
    db=value
})
.catch((err)=>{
    console.log('Db connection Failed!')
    console.log(err)
})
module.exports=dbConnection