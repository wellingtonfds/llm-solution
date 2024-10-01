import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateMeasureResponseDto } from '../dto/create-measure-response.dto';
import { MeasureWithCustomer } from '../types/measure-with-costumer';



export class CreateMeasureResponseSerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

        return handler.handle().pipe(
            map((data: MeasureWithCustomer) => {
                const payload = {
                    ...data,
                    measure_uuid: data.id,
                }
                return plainToClass(CreateMeasureResponseDto, payload, {
                    excludeExtraneousValues: true, // remove fields that are not in the DTO
                    exposeUnsetFields: false, // remove fields with value of undefined
                });
            }),
        );
    }
}