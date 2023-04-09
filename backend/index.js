const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const User=require('./userSchema');

dotenv.config();

app.use(express.json());
app.use(cors());

const connection_url=process.env.MONGOOSE_URL;

mongoose.connect(connection_url)
.then(()=> console.log("Database Connected"));

app.post("/registerUser",(req,res)=>{
    const details=req.body;
    
    const registerUser=async()=>{
        const docs=await User.findOne({email:details.email});
        if(docs!==null) res.status(409).json({});
        else{
            const hash=bcrypt.hashSync(details.password,10);
            const save=await User.create({email:details.email,password:hash})
            res.status(201).json(save);
        }
    }
    registerUser();


})

app.post("/loginUser",(req,res)=>{
    const details=req.body;

    const loginUser=async()=>{
        const docs=await User.findOne({email:details.email});
        if(docs===null) res.status(200).json({})
        else{
            const pass=bcrypt.compareSync(details.password,docs.password);
            if(pass===true) res.status(200).json(docs);
            else res.status(200).json({});
        }
    }
    loginUser();
})

app.listen(process.env.PORT,()=> console.log(`Server running at port ${process.env.PORT}`))