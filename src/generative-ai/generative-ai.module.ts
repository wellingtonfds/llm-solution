import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import dataConfigGoogle from "./generative-ai.config";
import { GenerativeAiService } from "./generative-ai.service";
import { GoogleAIProvider } from "./google.provider";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [dataConfigGoogle]
        })
    ],
    providers: [GenerativeAiService, GoogleAIProvider]
})
export class GenerativeAiModule { }