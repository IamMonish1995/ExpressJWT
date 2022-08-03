import AcademyModel from "../models/Academy.js";
import bcrypt from 'bcrypt'

class AcademyController {
    // GET ALL ACADEMY
    static getAllacademy = async (req, res) => {
        let searched_name_pattern = req.query.searched_name_pattern;
        console.log("get all academy called");
        const academy = await AcademyModel.find(
            { academyName: { $regex: searched_name_pattern || "", $options: "i" } }
        ).select('-password');
        res.send(academy);
    }

    // ADD NEW ACADEMY
    static addAcademy = async (req, res) => {
        console.log("add academy called");
        const {
            academyName, address, phone, email, personName, logo, banner, accreditation, facebook,
            twitter, instagram, sportsList, password } = req.body

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
                        role: "academy"
                    })
                    await doc.save()
                    const saved_academy = await AcademyModel.findOne({ email: email })
                    res.status(201).send({ "status": "success", "message": "Academy Created Successfully" })
                } catch (error) {
                    console.log(error)
                    res.send({ "status": "failed", "message": "Unable to Create Academy" })
                }


            } else {
                res.send({ "status": "failed", "message": "Please Fill All Required Fields" })

            }
        }
    }
    // DELETE ACADEMY
    static deleteAcademy = async (req, res) => {
        console.log("delete academy called");
        const { email } = req.body;
        const academy = await AcademyModel.findOne({ email: email })
        if (!academy) {
            res.send({ "status": "failed", "message": "Academy not found" })
        } else {
            try {
                AcademyModel.findOneAndRemove({email:email}, function (err) {
                    if (err) {
                        console.log(err)
                        res.send({ "status": "failed", "message": "Unable to Delete Academy" })
                    } else {
                res.send({ "status": "success", "message": "Academy Deleted Successfully" })
                    }
                });
            }
            catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "Unable to Delete Academy" })
            }
        }
    }
}

export default AcademyController;