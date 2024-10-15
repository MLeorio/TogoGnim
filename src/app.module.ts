import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { AnnexeModule } from './annexe/annexe.module';
import { CoordsModule } from './coords/coords.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UserModule,
    MailerModule,
    CategoryModule,
    StoreModule,
    ProductModule,
    SubCategoryModule,
    AnnexeModule,
    CoordsModule,
  ],
})
export class AppModule { }
