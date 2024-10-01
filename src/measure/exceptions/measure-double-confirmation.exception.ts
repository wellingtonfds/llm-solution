import { ConflictException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class MeasureDoubleConfirmationException extends ConflictException {

    @ApiProperty()
    public error_code: string

    @ApiProperty()
    public error_message: string
    constructor() {
        super('Leitura do mês já realizada');
        this.error_code = 'CONFIRMATION_DUPLICATE';
    }
}