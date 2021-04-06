import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpErrorFilter } from './common/interceptors/error.interceptor';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { BookModule } from './books/book.module';
import { OrderModule } from './orders/order.module';

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
    OrderModule,
  ],
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
  controllers: [AppController],
})
export class AppModule {}
