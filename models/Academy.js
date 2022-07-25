import mongoose from "mongoose";

// Defining Schema
const academySchema = new mongoose.Schema({
    academyName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: Number },
    email: { type: String, required: true, trim: true },
    personName: { type: String, required: true, trim: true },
    logo: { type: String, trim: true },
    banner: { type: String, trim: true },
    accreditation: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String,  trim: true },
    instagram: { type: String, trim: true },
    sportsList: { type: Array},
    password: { type: String, required: true, trim: true },
})

// Model
const AcademyModel = mongoose.model("academy", academySchema)

export default AcademyModel