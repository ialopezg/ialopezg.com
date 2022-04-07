import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common"

import {contextMiddleware} from "./middlewares"

@Module({
    imports: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*')
    }
}