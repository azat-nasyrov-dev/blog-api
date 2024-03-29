import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '../../articles/entities/article.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, (artilce) => artilce.author)
  articles: ArticleEntity[];
}
