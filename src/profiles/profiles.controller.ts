import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/decorators/user.decorator';
import { ProfileResponseInterface } from './types/profile-response.interface';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '../users/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Return profile' })
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

  @ApiOperation({ summary: 'Follow profile' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully followed profile',
  })
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

  @ApiOperation({ summary: 'Unfollow profile' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully unfollowed profile',
  })
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
