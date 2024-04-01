import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '../../articles/entities/article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'johndoe@gmail.com', description: 'Email' })
  @Column()
  email: string;

  @ApiProperty({ example: 'John', description: 'Username' })
  @Column()
  username: string;

  @ApiProperty({ example: 'bio', description: 'Biography' })
  @Column({ default: '' })
  bio: string;

  @ApiProperty({ example: 'image', description: 'User photo' })
  @Column({ default: '' })
  image: string;

  @ApiProperty({ example: '1233456', description: 'User password' })
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, (artilce) => artilce.author)
  articles: ArticleEntity[];

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];
}
