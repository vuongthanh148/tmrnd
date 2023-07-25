import { Module } from '@nestjs/common';
import { CityLinkService } from './city-link.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [CityLinkService],
    exports: [CityLinkService]
})
export class CityLinkModule { }
