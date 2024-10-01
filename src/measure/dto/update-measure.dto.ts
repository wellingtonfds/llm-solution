import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumberString } from "class-validator"


export class UpdateMeasureDto {

    @ApiProperty()
    @IsNotEmpty()
    measure_uuid: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    confirmed_value: string
}
