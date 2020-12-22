import { Expose } from 'class-transformer';

import { Constructor, DecoratorBuilder } from './base-builder';

export interface Transforming {
    expose(): this;
    maybeExpose(): this;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function TransformerBuilder<B extends Constructor<DecoratorBuilder>>(Base: B) {
    return class TransformerMixin extends Base implements Transforming {

        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        public expose(): this {
            this.add(Expose());
            return this;
        }

        public maybeExpose(): this {
            if (this.options.expose) {
                return this.expose();
            }

            return this;
        }
    };
}
