import express  from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/connection.js";
import cors from "cors"
import Experiment from "./mongodb/models/experiment.js";
import User from "./mongodb/models/user.js";
import CoreData from "./mongodb/models/coredata.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
app.use(express.json());
app.use(cors())

app.post("/login", async (req, res) => {
    const isExist = await User.findOne({email: req.body.email});
    if(isExist){
        return res.send({message: true, data: isExist});
    }
    const user = await User.create({
        email: req.body.email,
        password: req.body.password
    })

    res.send({message: true, data: user});
})

app.post("/", async (req, res) => {
    const {name, shortDescription, level, subject, mainImgUrl, materialLists, safety, instructions} = req.body.form;
    const experiment = await Experiment.create({name, shortDescription, level, subject, mainImgUrl, materialLists, safety, instructions})
    res.json({message: true, data: experiment})
})

app.get("/", async(req, res) => {
    const subject = req.query.filter;
    const filter = subject === "All"? {} : {subject};
    
    const experiments = await Experiment.find({
        ...filter
    });
    res.json({message: true, data:experiments})
})
app.get("/:id", async(req, res) => {
    const id = (req.params.id);
    const experiment = await Experiment.findById(id);
    res.json({message: true, data:experiment})
})

app.post("/data", async (req, res) => {
    const result = await CoreData.findById('64328a753731a375630ca82f');
    res.json({message: true, data: result})
})

app.post("/add-data", async (req, res) => {
    const result = await CoreData.findById('64328a753731a375630ca82f');
    if(req.body.type === "Subject")result.Subject.push(req.body.value);
    if(req.body.type === "Category")result.Category.push(req.body.value);
    await result.save();
    const finalResult = await CoreData.findById('64328a753731a375630ca82f');
    res.json({message: true, data: finalResult});
})



app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})