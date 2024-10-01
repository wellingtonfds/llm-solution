import { ApiProperty } from "@nestjs/swagger";
import { MeasureType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, Validate } from 'class-validator';
import { ImageValidate } from "../validate/image.validate";

export class CreateMeasureDto {

    @ApiProperty()
    @IsNotEmpty()
    @Validate(ImageValidate)
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    customer_code: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    measure_datetime: Date

    @ApiProperty({
        enum: MeasureType,
        type: 'enum',
        enumName: 'MeasureType'

    })
    @IsNotEmpty()
    measure_type: MeasureType



}

