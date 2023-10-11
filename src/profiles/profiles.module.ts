import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
