import { Expose } from 'class-transformer';

import { Constructor, DecoratorBuilder } from './base-builder';

export interface Transforming {
    expose(): DecoratorBuilder;
    maybeExpose(): DecoratorBuilder;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function TransformerBuilder<B extends Constructor<DecoratorBuilder>>(Base: B) {
    return class TransformerMixin extends Base implements Transforming {

        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        public expose(): DecoratorBuilder {
            this.add(Expose());
            return this;
        }

        public maybeExpose(): DecoratorBuilder {
            if (this.options.expose) {
                return this.expose();
            }

            return this;
        }
    };
}
