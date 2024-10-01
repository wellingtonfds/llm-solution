import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, UploadFileResponse } from "@google/generative-ai/server";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { mimeType } from '../shared/local-file-maneger';


@Injectable()
export class GoogleAIProvider {

    private genAI: GoogleGenerativeAI;
    private fileManger: GoogleAIFileManager
    private model: GenerativeModel

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('google.generativeAIApiKey')
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.fileManger = new GoogleAIFileManager(apiKey)
    }


    private upload(filePath: string, mimeType: mimeType): Promise<UploadFileResponse> {
        const uploadResult = this.fileManger.uploadFile(filePath, {
            mimeType,
            displayName: 'Generated image'
        })
        return uploadResult
    }

    public async generateContent(filePath: string, mimeType: mimeType, prompt: string): Promise<string> {
        const uploadResult = await this.upload(filePath, mimeType)
        const result = await this.model.generateContent([
            prompt,
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType
                }
            }

        ])
        return result.response.text().trim()
    }
}