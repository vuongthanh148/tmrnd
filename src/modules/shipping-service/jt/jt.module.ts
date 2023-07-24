import { Module } from '@nestjs/common';
import { JtService } from './jt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JtService],
  exports: [JtService]
})
export class JtModule { }
