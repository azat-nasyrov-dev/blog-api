import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'title-1-ke2yh', description: 'Unique slug' })
  @Column()
  slug: string;

  @ApiProperty({ example: 'title', description: 'Title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'description', description: 'Description' })
  @Column({ default: '' })
  description: string;

  @ApiProperty({ example: 'body', description: 'Body' })
  @Column({ default: '' })
  body: string;

  @ApiProperty({ example: '02.04.24', description: 'Date of creation' })
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: '02.04.24', description: 'Date of update' })
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ example: 'tags', description: 'List of tags' })
  @Column('simple-array')
  tagList: string[];

  @ApiProperty({ example: 5, description: 'Counting favorites' })
  @Column({ default: 0 })
  favoritesCount: number;

  @BeforeUpdate()
  public updateTimestamp(): void {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;
}
