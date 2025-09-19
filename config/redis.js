import Redis from 'ioredis';
import dotenv from 'dotenv'
dotenv.config()

export const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
console.log(process.env.REDIS_HOST)
// Log on successful connection
redisClient.on('connect', async () => {
    console.log('Redis connected');
    try {
        await redisClient.ping();
        console.log('Redis PING success');
    } catch (err) {
        console.error('Redis PING failed:', err.message);
    }
});

// Log on error
redisClient.on('error', (err) => {
    console.error('Redis error:', err.message);
    process.exit(1);
});

