import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { ConfigService } from "@nestjs/config";

export class GoogleAIProvider {

    private genAI: GoogleGenerativeAI;
    private fileManger: GoogleAIFileManager
    private model: GenerativeModel

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get('google.generativeAIApiKey')
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.fileManger = new GoogleAIFileManager(apiKey)
    }
}