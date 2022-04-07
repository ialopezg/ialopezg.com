import {NestApplication, NestFactory} from "@nestjs/core";

import {AppModule} from "./AppModule";

async function bootstrap() {
    const app = await NestFactory.create<NestApplication>(
        AppModule
    )
    const port = configService.getNumber('PORT')

    console.info(`server running on port ${port}`)
}
bootstrap()