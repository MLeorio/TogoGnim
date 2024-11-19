import { Module } from '@nestjs/common';
import { AnnexeService } from './annexe.service';
import { AnnexeController } from './annexe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Annexe, AnnexeSchema } from './schemas/annexe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Annexe.name, schema: AnnexeSchema }]),
  ],
  controllers: [AnnexeController],
  providers: [AnnexeService],
})
export class AnnexeModule {}
