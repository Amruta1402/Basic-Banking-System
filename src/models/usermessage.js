const mongoose=require('mongoose');
const validator=require('validator');


userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Id");
            }
        }
    },
    pass:{
        type:String,
        required:true,
        minlength:4
    },
    balance:{
        type:Number,
        required:true,

    }
});
//define a collection
const item=mongoose.model('item',userSchema);
module.exports=item;