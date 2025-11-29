import redisClient from "../config/redis.js";

export async function invalidateCache (pattern){
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log(`Invalidated ${keys.length} cache keys`);
      }
    } catch (error) {
      console.error('Invalidate Error:', error);
    }
  };