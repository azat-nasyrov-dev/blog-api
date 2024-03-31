import { UserType } from '../../users/types/user.type';

export type ProfileType = UserType & { following: boolean };
