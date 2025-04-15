import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MarketDataService } from '../market-data/market-data.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@WebSocketGateway({
  namespace: '/price', // Adicione namespace
  cors: {
    origin: '*',
  },
})
@UseGuards(JwtAuthGuard)
export class PriceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly marketDataService: MarketDataService) {}

  afterInit() {
    console.log('WebSocket iniciado ✅');
  }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    client.on('error', (err) => {
      console.error('Erro na conexão:', err);
      client.disconnect();
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('watch_price')
  async handleWatchPrice(client: Socket, ticker: string) {
    console.log(`Consultando preço para: ${ticker}`);

    const price = await this.marketDataService.getPrice(ticker);
    client.emit('price_update', {
      ticker,
      price,
    });
  }
}
