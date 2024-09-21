import mongoose, { Schema, Document } from "mongoose";

interface IStudent extends Document {
  fullName: string;
  age: string;
  email: string;
  class: string;
}

const studentSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  age: { type: String },
  email: { type: String },
  class: { type: String },
});

export const studentModel = mongoose.model<IStudent>("student", studentSchema);
