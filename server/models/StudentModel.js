import mongoose from "mongoose";
const studSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Student =  mongoose.model('Student' , studSchema)
export default Student