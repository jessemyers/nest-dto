import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    IsDefined,
    IsOptional,
    ValidateNested,
} from 'class-validator';

import { ComposedPropertyDecorator, DecoratorOptions } from '../types';
import { compose } from './compose';

export interface Nested<T> extends Record<string, unknown> {
    new (): T;
}

export interface NestedOptions<T> extends DecoratorOptions {
    nested: Nested<T>,
}

export function IsNested<T>(options: NestedOptions<T>): ComposedPropertyDecorator {
    return compose([
        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        Expose(),

        /* Convert to nested type.
         */
        Type(() => options.nested),

        /* Validate input data as a string.
         */
        ValidateNested(),

        /* Determine whether the input data is optional.
         */
        options.optional ? IsOptional() : IsDefined(),

        /* Document as an API Property.
         */
        ApiProperty({
            description: options.description,
            type: options.nested,
        }),
    ]);
}
