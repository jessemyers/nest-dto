# nest-dto

NestJS DTO decorators.


## What Is This?

NestJS data transfer objects (DTOs) rely on decorators from the `class-transform` and the
`class-validator` libraries and often also require the decorators from the `@nestjs/swagger`
library. As a result, a single property may be decorated a number of times:

```ts
export class Example {

    @Expose()
    @IsString()
    @IsDefined()
    @ApiProperty({
        description: 'An example value',
        type: 'string',
    })
    public value!: string;
}
```

With `nest-dto`, these are reduced to a single decorator:

```ts
export class Example {
    @IsString({
        description: 'An example value',
    })
    public value!: string;
}
```
