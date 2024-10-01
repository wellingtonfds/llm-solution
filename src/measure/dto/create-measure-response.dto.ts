import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateMeasureResponseDto {

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    image_url: string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    measure_value: string

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    measure_uuid: string

}

