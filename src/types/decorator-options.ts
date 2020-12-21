export interface DecoratorOptions {
    description?: string;
    // TODO: defined multiple imports with different default options
    // because sometimes we want expose and sometimes we do not
    expose?: boolean;
    // TODO: nullable?: boolean;
    optional?: boolean;
}
