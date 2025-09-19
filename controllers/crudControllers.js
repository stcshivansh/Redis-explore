import { addUser, findAllUsers, findUserByEmail, removeUserByEmail } from "../services/crudServices.js";


export const getAllUsers = async(req,res)=>{
    try {
        const users = await findAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to fetch users from Redis",
            error:err?.message
        });
    }
}
export const createUser = async(req,res)=>{
    try {
        const {email,name} = req.body;
        if(!email || !name)return res.status(400).json({
            success: false,
            message: "Email and name are required",
        })
        await addUser(email,name);
        return res.status(200).json({
            success: true,
            message: "Users created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to create user",
            error:error?.message
        });
    }
}
export const getUserByEmail = async(req,res)=>{
    try {
        const {email} = req.body;
        if(!email)return res.status(400).json({
            success: false,
            message: "Email is required",
        })
        const user = await findUserByEmail(email);
        if(!user)return res.status(404).json({
            success: false,
            message: "User not found",
        })
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to fetch user from Redis",
            error:err?.message
        });
    }
}
export const deleteUserByEmail = async(req,res)=>{
    try {
        const {email} = req.body;
        if(!email)return res.status(400).json({
            success: false,
            message: "Email is required",
        })
        const response = await removeUserByEmail(email);
        if(!response){
            return res.status(200).json({
                success: false,
                message:"user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to delete user from Redis",
            error:error?.message
        });
    }
}
