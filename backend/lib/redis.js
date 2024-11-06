import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
});

// await redis.set("foo", "bar");
