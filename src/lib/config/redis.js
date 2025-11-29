import express from "express";
import { createClient } from "redis";
import "dotenv/config";

const app = express();
app.use(express.json());

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis Connected"));

(async () => {
    await redisClient.connect();
  })();

  export default redisClient;