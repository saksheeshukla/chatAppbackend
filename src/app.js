const express  =  require('express');
const cors = require('cors');
const app=express();
const chatroute =  require('./routes/chatReference.routes.js');
const authroute  =  require('./routes/user.routes.js');
const updateroute = require('./routes/updateInfo.route.js');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE']
}));

app.use('/auth',authroute);
app.use('/chats',chatroute);
app.use('/update',updateroute);

app.get('/',(req,res)=>{
    res.status(200).json({Status:"Chat System Is Live",Time:new Date()});
})

//Listening on port
app.listen(3000 || process.env.PORT ,()=>{
    console.log('server running on port 3000');
});