import { Expose } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';

import { InputDecorator, ComposedPropertyDecorator, DecoratorOptions } from './types';

export class DecoratorBuilder {
    private readonly decorators: InputDecorator[] = [];

    public add(decorator: InputDecorator): DecoratorBuilder {
        this.decorators.push(decorator);
        return this;
    }

    /* Mark property as an exposed transformation target.
     *
     * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
     */
    public expose(): DecoratorBuilder {
        this.add(Expose());
        return this;
    }

    /* Mark property as optional.
     */
    public optional(): DecoratorBuilder {
        this.add(IsOptional());
        return this;
    }

    /* Mark property as required.
     */
    public required(): DecoratorBuilder {
        this.add(IsDefined());
        return this;
    }

    public build(): ComposedPropertyDecorator {
        return (target: unknown, propertyKey: string): void => {
            for (const decorator of this.decorators) {
                decorator(target, propertyKey);
            }
        };
    }

    public static create(
        validator: PropertyDecorator,
        options: DecoratorOptions = {},
    ): DecoratorBuilder {
        const builder = new DecoratorBuilder();

        if (options.expose) {
            builder.expose();
        }

        builder.add(validator);

        if (options.optional) {
            builder.optional();
        } else {
            builder.required();
        }

        return builder;
    }
}
