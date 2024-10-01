import { Injectable } from '@nestjs/common';
import { mimeType } from '../shared/local-file-maneger';
import { GoogleAIProvider } from './google.provider';

@Injectable()
export class GenerativeAiService {

    constructor(private googleAiProvider: GoogleAIProvider) {
    }

    public async generateContent(filePath: string, mimeType: mimeType): Promise<string> {
        const prompt = "Extract only the water meter number from the image provided. Return only the numeric value, without any additional text or characters."
        return this.googleAiProvider.generateContent(filePath, mimeType, prompt)
    }
}