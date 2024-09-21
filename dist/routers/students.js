"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_1 = require("../models/students");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield students_1.studentModel.find();
        res.status(200).send(student);
    }
    catch (_a) {
        res.status(500).send("Something Went Wrong");
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield students_1.studentModel.findById(req.params.id);
    if (!student) {
        res.status(404);
    }
    res.send(student);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newStudent = yield students_1.studentModel.create(data);
        newStudent.save();
        res.status(201).send(newStudent);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const student = yield students_1.studentModel.findByIdAndUpdate(req.params.id, data, {
        new: true,
    });
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.status(204).send(student);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield students_1.studentModel.findByIdAndDelete(req.params.id);
    if (!student) {
        res.status(404).send("Student not found");
    }
    res.send("Deleted");
}));
exports.default = router;
