import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 100
    }
  }, // <--- End of the Fields Object
  { 
    timestamps: true // <--- The Options Object
  }
);

export const Post = mongoose.model("Post", postSchema);