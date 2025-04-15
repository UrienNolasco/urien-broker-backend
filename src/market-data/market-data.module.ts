import { Module } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MarketDataService],
  exports: [MarketDataService],
})
export class MarketDataModule {}
