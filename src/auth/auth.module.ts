import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: 'JWT_SECRET', // coloca isso no .env depois!
        signOptions: { expiresIn: '7d' },
      }),
      UsersModule,
      PrismaModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
  })
  export class AuthModule {}