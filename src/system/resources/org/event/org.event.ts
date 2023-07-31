import { Injectable } from '@nestjs/common';
import { OrgService } from '../org.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NewOrgEvent } from 'src/auth/entities/event.entity';
import { UpdateOrgDto } from '../dto';

@Injectable()
export class OrgEventListener {
  constructor(private orgService: OrgService) {}
  @OnEvent('org.new')
  handleCreatedEvent({ org }: NewOrgEvent) {
    const dto: UpdateOrgDto = {
      org_code: org.org_code,
      latitude: org.latitude,
      longitude: org.longitude,
      location: org.location,
      name: org.name,
    };

    return this.orgService.updateOrg(org.user, dto).catch((e) => {
      console.log('Org Event failed', { e });
    });
  }
}
