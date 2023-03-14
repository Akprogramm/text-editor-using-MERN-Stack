const express=require("express");
const connecttomongoose=require("./db");
const cors = require('cors');
const app=express();
const port=8000;
const lines=require("./module/schema");
connecttomongoose();
app.use(express.json());

app.use(cors());

app.get("/",async(req,res)=>{ 
    const note=await lines.find({});
    console.log(note);
    res.json(note); 
});

app.post("/adddata",async(req,res)=>{ 
    user = await lines.create({
        lines: req.body.lines,
        converter: req.body.converter
    });
    // console.log(user);
    res.send({result: "ok"}); 
});

app.listen(port,()=>{
    console.log('server is listening on port 6000');
});  