import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssetModule } from './asset/asset.module';
import { TransactionModule } from './transaction/transaction.module';
import { MarketDataModule } from './market-data/market-data.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, AssetModule, TransactionModule, MarketDataModule, PriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
