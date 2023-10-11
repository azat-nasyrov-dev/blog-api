import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../users/decorators/user.decorator';
import { ProfileResponseInterface } from './types/profile-response.interface';
import { ProfilesService } from './profiles.service';

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
}
