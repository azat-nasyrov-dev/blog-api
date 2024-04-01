import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { UserEntity } from '../users/entities/user.entity';
import { FollowEntity } from '../profiles/entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
