import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    IsDefined,
    IsOptional,
    IsInt as IsIntegerValidator,
    Max,
    Min,
} from 'class-validator';

import { ComposedPropertyDecorator, DecoratorOptions } from '../types';
import { compose } from './compose';

export interface IntegerOptions extends DecoratorOptions {
    maximum?: number,
    minimum?: number,
}

export function IsInteger(options: IntegerOptions = {}): ComposedPropertyDecorator {
    const decorators = [
        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        Expose(),

        /* Convert strings to numbers.
         */
        Type(() => Number),

        /* Validate input data as a string.
         */
        IsIntegerValidator(),

        /* Determine whether the input data is optional.
         */
        options.optional ? IsOptional() : IsDefined(),

        /* Document as an API Property.
         */
        ApiProperty({
            description: options.description,
            type: 'number',
            minimum: options.minimum,
            maximum: options.maximum,
        }),
    ];

    if (options.maximum !== undefined) {
        decorators.push(Max(options.maximum));
    }

    if (options.minimum !== undefined) {
        decorators.push(Min(options.minimum));
    }
    return compose(decorators);
}
