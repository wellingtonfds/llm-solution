import { registerAs } from "@nestjs/config";

export default registerAs('google', () => ({
    generativeAIApiKey: process.env.GEMINI_API_KEY
}))