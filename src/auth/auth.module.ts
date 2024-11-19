import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from 'src/mailer/mailer.module';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MailerModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (ConfigService: ConfigService) => ({
    //     secret: ConfigService.get('JWT_SECRET'),
    //     signOptions: { expiresIn: '60m' }
    //   })
    // }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MyJwtSecretToken24', // Utilise la clé correcte
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
