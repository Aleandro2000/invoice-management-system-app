import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenScheduleService } from './refresh_token.schedule.service';

describe('RefreshTokenScheduleService', () => {
  let service: RefreshTokenScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokenScheduleService],
    }).compile();

    service = module.get<RefreshTokenScheduleService>(RefreshTokenScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
