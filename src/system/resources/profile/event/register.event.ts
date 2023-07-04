import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserEvent } from 'src/auth/entities/event.entity';
import { UpdateProfileDto } from '../dto';

@Injectable()
export class ProfileEventListener {
  constructor(private profileService: ProfileService) {}
  @OnEvent('user.new')
  handleCreatedEvent({ user }: NewUserEvent) {
    const dto: UpdateProfileDto = {
      email: user.email,
      name: user.name,
    };

    return this.profileService.updateProfile(user.id, dto).catch((e) => {
      console.log('Profile Event failed', { e });
    });
  }
}
