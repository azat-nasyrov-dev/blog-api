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
import { BackendValidationPipe } from '../shared/pipes/backend-validation.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully created',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  public async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.createArticle(currentUser, createArticleDto);
    return this.articlesService.buildArticleResponse(article);
  }

  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Return all articles' })
  @Get()
  public async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articlesService.findListOfArticles(currentUserId, query);
  }

  @ApiOperation({ summary: 'Get article feed' })
  @ApiResponse({ status: 200, description: 'Return article feed' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('feed')
  @UseGuards(AuthGuard)
  public async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articlesService.getFeedFromUser(currentUserId, query);
  }

  @ApiOperation({ summary: 'Get single article' })
  @ApiResponse({ status: 200, description: 'Return one article' })
  @Get(':slug')
  public async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.findBySlug(slug);
    return this.articlesService.buildArticleResponse(article);
  }

  @ApiOperation({ summary: 'Delete article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':slug')
  @UseGuards(AuthGuard)
  public async delete(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<DeleteResult> {
    return await this.articlesService.deleteArticle(currentUserId, slug);
  }

  @ApiOperation({ summary: 'Update article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully updated',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  public async update(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.updateArticle(currentUserId, slug, updateArticleDto);
    return this.articlesService.buildArticleResponse(article);
  }

  @ApiOperation({ summary: 'Favorite article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully favorited',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  public async addArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.addArticleToFavorites(currentUserId, slug);
    return this.articlesService.buildArticleResponse(article);
  }

  @ApiOperation({ summary: 'Unfavorite article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully unfavorited',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
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
