"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const students_1 = __importDefault(require("./routers/students"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// app.use((req, res, next) => {
//     //logic
//     next();
// })
app.use((0, cors_1.default)({
    // origin: "http://localhost:5173",
    origin: "*",
}));
app.use(express_1.default.json()); //middleware
mongoose_1.default
    .connect(process.env.MONGODB_CONNECT_URL || "mongodb://localhost:27017/students")
    .then(() => console.log("connected"));
app.use("/students", students_1.default);
app.listen(process.env.PORT || port, () => console.log(`Running on port ${process.env.PORT}`));
