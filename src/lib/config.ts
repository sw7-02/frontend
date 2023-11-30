import { config } from "dotenv";
config(); // Reads from .env

export default {
    api_prefix: process.env["API_PREFIX"],
};
