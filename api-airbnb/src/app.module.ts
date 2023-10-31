import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/orm.config';
import { LocationModule } from './modules/location/location.module';
import { RoomModule } from './modules/room/room.module';
import { BookingModule } from './modules/booking/booking.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    UserModule,
    LocationModule,
    RoomModule,
    BookingModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
