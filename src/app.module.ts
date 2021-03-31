import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpErrorFilter } from './common/interceptors/error.interceptor';
import { DatabaseModule } from './common/database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { UserModule } from './users/user.module';
import { BookController } from './books/book.controller';
import { BookModule } from './books/book.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require(`./../config/config.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    BookModule,
  ],
  controllers: [AppController, AuthController, UserController, BookController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    ConfigService,
  ],
})
export class AppModule {}
