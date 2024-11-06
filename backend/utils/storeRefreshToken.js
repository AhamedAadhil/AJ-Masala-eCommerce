import { redis } from "../lib/redis.js";

export const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 24 * 60 * 60
  ); // 7 days
};
