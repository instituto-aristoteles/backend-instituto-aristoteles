import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { IsPublic } from '@/common/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @IsPublic()
  @HealthCheck()
  public check() {
    return this.health.check([
      () => this.db.pingCheck('database', { timeout: 10000 }),
    ]);
  }
}
