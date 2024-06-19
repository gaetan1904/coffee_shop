import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CoffeeModule } from "./coffee/coffee.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { Coffee } from "./coffee/coffee.entity";
import { User } from "./users/users.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("HOST"),
        port: configService.get<number>("PORT_DATABASE"),
        username: configService.get<string>("USER_NAME"),
        password: configService.get<string>("PASSWORD"),
        database: configService.get<string>("DATABASE"),
        entities: [Coffee, User],
        synchronize: true,
      }),
    }),
    CoffeeModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
