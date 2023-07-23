import { Module } from '@nestjs/common';
import { CachesService } from './caches.service';

@Module({
  controllers: [],
  providers: [CachesService],
  exports: [CachesService],
})
export class CachesModule {}
