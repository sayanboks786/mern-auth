import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import transporter from '../config/nodemailer.js';
import dotenv  from 'dotenv';


dotenv.config();
export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: "Missing details"})
    }

    try {
        const existingUSer = await User.findOne({email})
        
        if(existingUSer){
            return res.json({success: false, message: "User is already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
            maxAge: 7*24*60*60*1000
        });


        //send welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our app",
            text: `Thanks for signup. Your account has been created with email id: ${email}`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.error('Error while sending email:', err);
            }
            console.log('Email sent successfully:', info.response);
        });
          
        res.json({
            success: true,
            message: "Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Missing email or password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const logout = (req, res) => {
   
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

// send verification otp to the user's email
export const sendVerifyOtp =  async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await User.findById(userId);

        if(user.isAccountverified){
            return res.json({success: false, message: "Account is verified"});
        } 
        
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            text: `Your OTP is ${otp}. Verify your account using OTP.`
        }

        transporter.sendMail(mailOptions);
        res.json({success: true, message: "Verification OTP sent on Email"});
        
     } catch (error) {
        return res.json({success: false, message: error.message});
    }
}


export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp){
        return res.json({ success: false, message: "Missing Details"});
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({success: false, message: "user is not found"});
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({success: false, message: "invalid otp"});
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "otp expired"});
        }

        user.isAccountverified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message: "email verified successfully"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

// check user is authenticate
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true})
    } catch (error) {
        return res.json({success:false, message: error.message});
    }
}

// send password reset otp
export const sendResetOtp = async (req,res) =>{
    const {email} = req.body;

    if(!email){
        return res.json({success: false, message: "email is required"});
    }
    
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.restOtpExpireAt = Date.now() + 15 * 60 * 1000;
        
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for reset passwod is ${otp}. Use this OTP to proceed with reset your password.`
        }

        transporter.sendMail(mailOptions);
        res.json({success: true, message: "Password reset OTP sent on Email"});        

    } catch (error) {
        return res.json({success:false, message: error.message});
    }   
}

// reset user password

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    
    if (!email || !otp || !newPassword) {
        return res.json({success: false, message: "Email, OTP and new password are required"});
    }

    try {
    
        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message: "user not found"});
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if (user.restOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "OTP is expired"});
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashPassword;
        user.resetOtp = '';
        user.restOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: "Password has been Reset successfully"});
        

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}