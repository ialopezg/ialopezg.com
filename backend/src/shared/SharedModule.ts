import {Global, HttpModule, Module} from "@nestjs/common"
import {JwtModule} from "@nestjs/jwt";

const providers = []

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        JwtModule.registerAsync({
            imports: [SharedModule],
            useFactory: (configService => ({

            }))
        })
    ]
})

export class SharedModule { }