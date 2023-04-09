import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(res => console.log("Connected to Database success"))
    .catch(err => console.log(`Error in connecting to Database ${err}`))
}

export default connectDB;