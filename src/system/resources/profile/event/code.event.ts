import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserEvent } from 'src/auth/entities/event.entity';
import { UpdateProfileDto } from '../dto';

@Injectable()
export class LinkAccountEventListener {
  constructor(private profileService: ProfileService) {}
  @OnEvent('code.new')
  handleCreatedEvent({ user }: NewUserEvent) {
    const dto: UpdateProfileDto = {
      org_code: user.code,
    };

    return this.profileService.updateCode(user.id, dto).catch((e) => {
      console.log('Profile Event failed', { e });
    });
  }
}
