import { ApiProperty } from "@nestjs/swagger";

export class UpdateMeasureSuccessDto {
    @ApiProperty() public success: boolean
}