import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { ProfileResponseInterface } from './types/profile-response.interface';
import { FOLLOWER_FOLLOWING_EQUALITY_ERROR, PROFILE_NOT_EXIST_ERROR } from './profiles.constants';
import { FollowEntity } from './entities/follow.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  public async findProfileByUsername(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!user) {
      throw new HttpException(PROFILE_NOT_EXIST_ERROR, HttpStatus.NOT_FOUND);
    }

    return { ...user, following: false };
  }

  public async followProfileByUsername(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username: profileUsername },
    });

    if (!user) {
      throw new HttpException(PROFILE_NOT_EXIST_ERROR, HttpStatus.NOT_FOUND);
    }

    if (currentUserId === user.id) {
      throw new HttpException(FOLLOWER_FOLLOWING_EQUALITY_ERROR, HttpStatus.BAD_REQUEST);
    }

    const follow = await this.followRepository.findOne({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    if (!follow) {
      const followToCreate = new FollowEntity();
      followToCreate.followerId = currentUserId;
      followToCreate.followingId = user.id;

      await this.followRepository.save(followToCreate);
    }

    return { ...user, following: true };
  }

  public buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
    delete profile.email;
    return { profile };
  }
}
