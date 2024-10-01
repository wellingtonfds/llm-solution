import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { validateType } from "src/shared/local-file-maneger";

@ValidatorConstraint({ name: 'ImageValidate', async: true })
@Injectable()
export class ImageValidate implements ValidatorConstraintInterface {
    constructor() { }

    async validate(value: string) {
        return !!validateType(value)
    }

    defaultMessage(args: ValidationArguments) {
        return `Support only jpeg, png, webp`;
    }
}