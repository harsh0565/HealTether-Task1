import express from "express";
import router from "./routes/authRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = 3000

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);



app.get("/", (req,res)=>{
    res.send({msg: "this is the testing phase"});
})
app.listen(PORT, ()=>{
    console.log(`server is running at port http://localhost:${PORT}`);
});