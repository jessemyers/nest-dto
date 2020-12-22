import { IsString as IsStringValidator } from 'class-validator';

import { DefaultDecoratorBuilder } from '../builders';
import { ComposedPropertyDecorator, DecoratorOptions } from '../types';

export function IsString(options: DecoratorOptions = {}): ComposedPropertyDecorator {
    const builder = new DefaultDecoratorBuilder(
        options,
        [
            IsStringValidator(),
        ],
    );
    // TODO: we cannot chain these types because of the return type
    builder.api();
    builder.maybeExpose();
    builder.maybeRequired();
    return builder.build();
}
