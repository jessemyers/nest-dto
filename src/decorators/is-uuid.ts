import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
    IsDefined,
    IsOptional,
    IsUUID as IsUUIDValidator,
} from 'class-validator';

import { ComposedPropertyDecorator, DecoratorOptions } from '../types';
import { compose } from './compose';

export type UUIDOptions = DecoratorOptions;

export function IsUUID(options: UUIDOptions = {}): ComposedPropertyDecorator {
    return compose([
        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        Expose(),

        /* Validate input data as a string.
         */
        IsUUIDValidator(),

        /* Determine whether the input data is optional.
         */
        options.optional ? IsOptional() : IsDefined(),

        /* Document as an API Property.
         */
        ApiProperty({
            description: options.description,
            format: 'uuid',
            type: 'string',
        }),
    ]);
}
