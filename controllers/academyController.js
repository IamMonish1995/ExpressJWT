import AcademyModel from "../models/Academy.js";
import bcrypt from 'bcrypt'

class AcademyController {
    // GET ALL ACADEMY
    static getAllacademy = async (req, res) => {
        const academy = await AcademyModel.find().select('-password');
        res.send(academy);
    }
    // ADD NEW ACADEMY
    static addAcademy = async (req, res) => {
        const {
            academyName,address,phone,email,personName,logo,banner,accreditation,facebook,
            twitter, instagram, sportsList, password } = req.body
        console.log(academyName, address, phone, email, personName, logo, banner, accreditation, facebook,
            twitter, instagram, sportsList, password);
        const academy = await AcademyModel.findOne({ email: email })
        if (academy) {
            res.send({ "status": "failed", "message": "Academy already exists" })
        } else {
            if (academyName && email && password) { 
                
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new AcademyModel({
                            academyName,
                            address,
                            phone,
                            email,
                            personName,
                            logo,
                            banner,
                            accreditation,
                            facebook,
                            twitter,
                            instagram,
                            sportsList,
                            password: hashPassword,
                        })
                        await doc.save()
                        const saved_academy = await AcademyModel.findOne({ email: email })
                        res.status(201).send({ "status": "success", "message": "Academy Created Successfully"})
                    } catch (error) {
                        console.log(error)
                        res.send({ "status": "failed", "message": "Unable to Create Academy" })
                    }
                

            } else {
                res.send({ "status": "failed", "message": "Please Fill All Required Fields" })

            }
        }
    }
}

export default AcademyController;