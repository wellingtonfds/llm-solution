import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GenerativeAiService } from "./generative-ai.service";
import { GoogleAIProvider } from "./google.provider";

@Module({
    imports: [ConfigModule],
    providers: [GenerativeAiService, GoogleAIProvider],
    exports: [GenerativeAiService]
})
export class GenerativeAiModule { }