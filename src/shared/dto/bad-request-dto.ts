import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BadRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    error_code: string;

    @ApiProperty()
    @IsNotEmpty()
    error_description: string;
}