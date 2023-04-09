import mongoose from "mongoose";

const experimentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  level: {
    type: String,
  },
  subject: {
    type: String,
  },
  mainImgUrl: {
    type: String,
  },
  materialLists: {
    type: [String],
  },
  safety: {
    type: [String],
  },
  instructions: {
    type: [
      {
        img: {},
        imgUrl: String,
        step: String,
      },
    ],
  },
});

const Experiment = mongoose.model("Experiment" ,experimentSchema)

export default Experiment
