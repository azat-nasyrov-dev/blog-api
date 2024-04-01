import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../users/guards/auth.guard';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleResponseInterface } from './types/article-response.interface';
import { DeleteResult } from 'typeorm';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesResponseInterface } from './types/articles-response.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  public async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.createArticle(currentUser, createArticleDto);
    return this.articlesService.buildArticleResponse(article);
  }

  @Get()
  public async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articlesService.findListOfArticles(currentUserId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  public async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articlesService.getFeedFromUser(currentUserId, query);
  }

  @Get(':slug')
  public async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.findBySlug(slug);
    return this.articlesService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  public async delete(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<DeleteResult> {
    return await this.articlesService.deleteArticle(currentUserId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  public async update(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.updateArticle(currentUserId, slug, updateArticleDto);
    return this.articlesService.buildArticleResponse(article);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  public async addArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.addArticleToFavorites(currentUserId, slug);
    return this.articlesService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  public async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.deleteArticleFromFavorites(currentUserId, slug);
    return this.articlesService.buildArticleResponse(article);
  }
}
