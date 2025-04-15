import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MarketDataService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(ticker: string): Promise<number> {
    const apiKey = process.env.BRAPI_KEY;
    const url = `https://brapi.dev/api/quote/${ticker}?token=${apiKey}`;

    try {
        const response = await lastValueFrom(
          this.httpService.get(url) // Remove o headers
        );
    
        const result = response.data?.results?.[0];
        return result?.regularMarketPrice ?? 0;
      } catch (error) {
        console.error(`Erro ao consultar ${ticker} na BRAPI:`, error.message);
        return 0;
      }
  }
}
