import { Module } from '@nestjs/common';
import { PriceGateway } from './price.gateway';
import { MarketDataModule } from '../market-data/market-data.module';

@Module({
  imports: [MarketDataModule],
  providers: [PriceGateway],
})
export class PriceModule {}