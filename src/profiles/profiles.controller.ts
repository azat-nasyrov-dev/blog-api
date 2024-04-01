import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/decorators/user.decorator';
import { ProfileResponseInterface } from './types/profile-response.interface';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':username')
  public async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profilesService.findProfileByUsername(
      currentUserId,
      profileUsername,
    );
    return this.profilesService.buildProfileResponse(profile);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  public async followProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profilesService.followProfileByUsername(
      currentUserId,
      profileUsername,
    );
    return this.profilesService.buildProfileResponse(profile);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  public async unFollowProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profilesService.unFollowProfileByUsername(
      currentUserId,
      profileUsername,
    );
    return this.profilesService.buildProfileResponse(profile);
  }
}
