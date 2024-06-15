const mongoose  =  require('mongoose');

//connecting to database
mongoose.connect('mongodb+srv://admin:admin@cluster0.f28sf8b.mongodb.net/whatappdb')
.then(()=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log(err);
})

module.exports =  mongoose;
