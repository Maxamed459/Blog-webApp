import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const dbUrl = process.env.MONGO_URL;
