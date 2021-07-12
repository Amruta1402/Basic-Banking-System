const mongoose= require('mongoose');
//connection
mongoose.connect('mongodb+srv://Amruta-1402:ammu1402@cluster0.6bxpm.mongodb.net/bankdb',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
console.log('Connection Successful');
}).catch((error)=>{
console.log(error);
});