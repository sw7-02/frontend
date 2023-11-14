import { config } from "dotenv";
config(); // Reads from .env

export default {
    api: {
        /// Prefix for all the api-calls (handled by proxy)
        prefix: process.env["API_PREFIX"] || "/api/v1",
    },

}