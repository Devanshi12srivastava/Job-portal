import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userroutes.js"
import  companyRoute  from "./routes/companyroute.js";
import jobRoute from "./routes/jobroute.js"
import applicationRoute from "./routes/applicationroute.js"

dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption={
    origin:['http://localhost:5173',
    'job-portal-rho-teal.vercel.app'],
    credentials:true
};
app.use(cors(corsOption));
const PORT=process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at ${PORT}`);
})