import { InputDecorator, ComposedPropertyDecorator, DecoratorOptions } from '../types';

export class DecoratorBuilder {
    public readonly decorators: InputDecorator[];

    constructor(
        public readonly options: DecoratorOptions,
        ...decorators: InputDecorator[]
    ) {
        this.decorators = decorators;
    }

    public add(decorator: InputDecorator): this {
        this.decorators.push(decorator);
        return this;
    }

    public build(): ComposedPropertyDecorator {
        return (target: unknown, propertyKey: string): void => {
            for (const decorator of this.decorators) {
                decorator(target, propertyKey);
            }
        };
    }
}

export interface Constructor<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
}
