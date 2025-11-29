import redisClient from "../config/redis.js";

export function caching (durationInMinutes = 5){
    return async (req, res, next) => {
        if (req.method !== 'GET') {
          return next();
        }
    
        const key = `cache:${req.originalUrl}`;
        const durationInSeconds = durationInMinutes * 60;
        
        try {
          const cachedData = await redisClient.get(key);
          
          if (cachedData) {
            console.log('Cache HIT:', key);
            return res.json(JSON.parse(cachedData));
          }
          
          console.log('Cache MISS:', key);
          
          const originalJson = res.json.bind(res);
          res.json = (data) => {
            redisClient.setEx(key, durationInSeconds, JSON.stringify(data));
            console.log(`Cache saved for ${durationInMinutes} minutes`);
            return originalJson(data);
          };
          
          next();
        } catch (error) {
          console.error('Cache Error:', error);
          next();
        }
      };
  };