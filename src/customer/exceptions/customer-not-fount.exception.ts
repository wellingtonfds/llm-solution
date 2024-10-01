import { NotFoundException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CustomerNotFoundException extends NotFoundException {
    @ApiProperty()
    public error_code: string

    @ApiProperty()
    public error_message: string
    constructor() {
        super('Nenhuma leitura encontrada');
        this.error_code = 'MEASURES_NOT_FOUND';
    }
}