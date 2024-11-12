import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(
  process.env.NODE_ENV === "development"
    ? process.env.REDIS_URL_LOCAL
    : process.env.REDIS_URL_CLOUD
);

// await redis.set("foo", "bar");
