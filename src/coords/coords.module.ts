import { Module } from '@nestjs/common';
import { CoordsService } from './coords.service';
import { CoordController } from './coords.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coord, CoordSchema } from './schemas/coord.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coord.name, schema: CoordSchema }]),
  ],
  controllers: [CoordController],
  providers: [CoordsService],
})
export class CoordsModule {}
