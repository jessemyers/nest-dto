import { ApiProperty } from '@nestjs/swagger';

import { Constructor, DecoratorBuilder } from './base-builder';

export interface Swaggered {
    api(): DecoratorBuilder;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SwaggerBuilder<B extends Constructor<DecoratorBuilder>>(Base: B) {
    return class SwaggerMixin extends Base implements Swaggered {

        public api(): DecoratorBuilder {
            this.add(
                ApiProperty({
                    description: this.options.description,
                    format: this.options.format,
                    type: this.options.type,
                }),
            );
            return this;
        }
    };
}
