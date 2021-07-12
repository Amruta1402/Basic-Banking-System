const express=require('express');
const path=require('path');
const item=require('./models/usermessage');
const ejs=require('ejs');
// const customers=document.getElementById('customers');
require('./db/conn');

const app=express();
const port=process.env.PORT || 3000;

// setting the path of public or static folder
const staticpath=path.join(__dirname,'../public');
console.log(staticpath);
//serving static website
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')));
app.use('/popper',express.static(path.join(__dirname,'../node_modules/popper.js/dist/umd')));

app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}));
//setting view engine
app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'../views'));
//middleware


//routing
//app.get(path,callback)
app.get('/',(req,res)=>{
res.render('index');
});
app.get('/index',(req,res)=>{
    res.render('index');
    });
app.get('/customers',(req,res)=>{
    item.find({},function(error,items){
        res.status(201).render("customers",{
            customers:items
        });
    });
    // res.render('customers');
});
app.post('/',async(req,res)=>{
try {
    // res.send(req.body);
    
    const userData=new item(req.body);
//     const name=userData.name;
//     const email=userData.email;
//     const balance=userData.balance;
//     html=html +`<tr>
//     <td class="border-right">${name}</td>
//     <td class="border-right">${email}</td>
//     <td class="border-right">${balance}</td>
    
// </tr>`;
    await userData.save();
    //pass all the records of customers to the customers html
    item.find({},function(error,items){
        res.status(201).render("customers",{
            customers:items
        });
    });
    
    
    
} catch (error) {
    res.status(500).send(error);
}
})
app.post('/customers',async(req,res)=>{
    try {
    const userData=new item(req.body);
    await userData.save();
    item.find({},function(error,items){
        res.status(201).render("customers",{
            customers:items
        });
    });
    
    } catch (error) {
        res.status(500).send(error);
    }
    });

    // transfer form post
app.post('/transfer',async(req,res)=>{
try {
    const sendername=req.body.sendername;
    const senderpass=req.body.senderpass;
    const recievername=req.body.recievername;
    const transferamt=req.body.transferamt;
    // console.log(sendername);
    
    const senresult= await item.updateOne({$and:[{name:sendername} , {pass:senderpass}]},{$inc:{balance: -transferamt}});
    // console.log(senresult);
    const recresult=await item.updateOne({name:recievername},{$inc:{balance:transferamt}});
    // console.log(recresult);
    // window.alert(`Hello, ${sendername} Transaction Successfull!!..`);
    item.find({},function(error,items){
        res.status(201).render("customers",{
            customers:items
            
        });
    });
} catch (error) {
    res.status(500).send(error);
}
});

//add amount
app.post('/add',async(req,res)=>{
try {
    const name=req.body.name;
    const pass=req.body.pass;
    const addamt=req.body.addamt;
    const addres= await item.updateOne({$and:[{name:name} , {pass:pass}]},{$inc:{balance:addamt}});
    console.log(addres);
    item.find({},function(error,items){
        res.status(201).render("customers",{
            customers:items
        });
    });
} catch (error) {
    console.log(error);
}
});

//add amount
app.post('/retrieve',async(req,res)=>{
    try {
        const name=req.body.name;
        const pass=req.body.pass;
        const retrieveamt=req.body.retrieveamt;
        const retres= await item.updateOne({$and:[{name:name} , {pass:pass}]},{$inc:{balance: -retrieveamt}});
        console.log(retres);
        item.find({},function(error,items){
            res.status(201).render("customers",{
                customers:items
            });
        });
    } catch (error) {
        console.log(error);
    }
    });

app.listen(port,()=>{
console.log(`Server running at port ${port}`);
});