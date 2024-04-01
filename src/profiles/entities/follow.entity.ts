import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'follows' })
export class FollowEntity {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 3, description: 'Follower ID' })
  @Column({ name: 'follower_id' })
  followerId: number;

  @ApiProperty({ example: 4, description: 'Following ID' })
  @Column({ name: 'following_id' })
  followingId: number;
}
