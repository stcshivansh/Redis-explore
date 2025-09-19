import { redisClient } from "../config/redis.js";

export const addUser = async(email,name)=>{
    try {
        await redisClient.hset(`user:${email}`, "name", name)
        await redisClient.sadd("users:emails",email)
    } catch (error) {
        console.error("redis error:", error.message);
        throw error
    }
}
export const findAllUsers = async()=>{
    try {
        return await redisClient.smembers("users:emails");
    } catch (error) {
        console.error("redis error:", err.message);
        throw error
    }
}
export const findUserByEmail  = async(email)=>{
    try {
        const exists = await redisClient.sismember("users:emails", email);
        if (!exists)return null;
        const user = await redisClient.hgetall(`user:${email}`);
        return {
            email,
            name: user.name
        }
        
    } catch (error) {
        console.error("redis error:", err.message);
        throw error
    }
}
export const removeUserByEmail  = async(email)=>{
    try {
        const exists = await redisClient.sismember("users:emails", email);
        if (!exists || exists === 0)return null;
        const user = await redisClient.srem("users:emails", email);
        const user2 = await redisClient.hdel(`user:${email}`,"name");
    } catch (error) {
        console.error("Redis error:", error.message);
        throw error
    }
}