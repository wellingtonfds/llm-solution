import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerListDTO } from '../dto/customer-list-measures.dto';
import { CustomerWithMeasure } from '../types/customer-with-measures';




export class CustomerListMeasuresInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

        return handler.handle().pipe(
            map((data: CustomerWithMeasure) => {
                const payload = {
                    ...data,
                    measures: data.measures.map((measure) => ({
                        measure_uuid: measure.id,
                        measure_datetime: measure.measure_datetime,
                        measure_type: measure.measure_type,
                        image_url: measure.image_url,
                        has_confirmed: !!measure.confirmed_value
                    }))
                }
                return plainToClass(CustomerListDTO, payload, {
                    excludeExtraneousValues: true,
                    exposeUnsetFields: false,
                });
            }),
        );
    }
}