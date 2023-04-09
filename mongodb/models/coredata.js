import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  Subject : {
    type: [String],
  },
  Category: {
    type: [String]
  }
  
});

const CoreData = mongoose.model("CoreData" ,dataSchema)

export default CoreData
