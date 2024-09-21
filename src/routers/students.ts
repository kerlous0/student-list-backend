import express from "express";
import { studentModel } from "../models/students";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const student = await studentModel.find();
    res.status(200).send(student);
  } catch {
    res.status(500).send("Something Went Wrong");
  }
});

router.get("/:id", async (req, res) => {
  const student = await studentModel.findById(req.params.id);
  if (!student) {
    res.status(404);
  }
  res.send(student);
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStudent = await studentModel.create(data);
    newStudent.save();
    res.status(201).send(newStudent);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const data = req.body;
  const student = await studentModel.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.status(204).send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await studentModel.findByIdAndDelete(req.params.id);
  if (!student) {
    res.status(404).send("Student not found");
  }
  res.send("Deleted");
});

export default router;
