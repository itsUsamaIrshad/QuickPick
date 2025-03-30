import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'



// route for user login

const loginUser = async(req,res)=>
{
    try {
        const {email ,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.json({success:false,message:'user not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch)
        {
            const token = createToken(user._id)
            res.json({success:true , token})
        }
        else
        {
            res.json({success:false, message:'Invalid Credentials'})

        }

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error, please try again' });
        
    }

}

// Route for user Register

// JWT Token Generation Function


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);  
};

// User Registration Function
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Email & Password Validation First
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Please enter a strong password (at least 8 characters)' });
        }

        // ✅ Checking if User Already Exists
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // ✅ Hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // ✅ Creating a New User
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });

        const user = await newUser.save();

        // ✅ Generating JWT Token
        const token = createToken(user._id);

        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error, please try again' });
    }
};


// Admin login

const adminLogin = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({ success: true, token });

        } 
        
        else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};





    export  {loginUser , registerUser , adminLogin}