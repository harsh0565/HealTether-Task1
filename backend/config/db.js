import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Healtether").then(()=>{
            console.log(`connected to the database successfully`);
        }).catch((err)=>{
            console.log("error in connection database");
        })

    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;