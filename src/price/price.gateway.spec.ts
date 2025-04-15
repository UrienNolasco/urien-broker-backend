import { Test, TestingModule } from '@nestjs/testing';
import { PriceGateway } from './price.gateway';

describe('PriceGateway', () => {
  let gateway: PriceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceGateway],
    }).compile();

    gateway = module.get<PriceGateway>(PriceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
