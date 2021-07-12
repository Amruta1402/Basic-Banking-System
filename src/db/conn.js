const mongoose= require('mongoose');
//connection
mongoose.connect('mongodb://localhost:27017/bankdb',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
console.log('Connection Successful');
}).catch((error)=>{
console.log(error);
});