import { User } from "../models/user.model.js";

export const getUserData = async (req, res) => {
    try {
        
        const userId = req.userId;

        const user = await User.findById(userId)
       

        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountverified: user.isAccountverified
            } 
        });


    } catch (error) {
       return res.json({success: false, message: error.message});
    }
}