import User from "models/User"
import connectDb from "middleware/db"
const CryptoJS = require("crypto-js");
const handler = async (req, res)=> {
    if(req.method == 'POST'){
        const {name,email} = req.body;
        let user = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()});
        await user.save();
        res.status(200).json("Success")
    }else{
        res.status(400).json({error:"This method is not allowed"})
    }
}
export default connectDb(handler);