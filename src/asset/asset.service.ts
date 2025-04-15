import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  // Criar um novo ativo na carteira do usuário
  async create(ticker: string, userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada para este usuário');
    }

    return this.prisma.asset.create({
      data: {
        ticker,
        walletId: wallet.id,
      },
    });
  }

  // Listar todos os ativos da carteira do usuário
  async findAll(userId: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada');
    }

    return this.prisma.asset.findMany({
      where: { walletId: wallet.id },
    });
  }

  // Buscar um ativo por ID (e garantir que pertence à carteira do usuário)
  async findOne(id: string, userId: string) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
      include: {
        wallet: true,
      },
    });

    if (!asset) {
      throw new NotFoundException('Ativo não encontrado');
    }

    if (asset.wallet.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a este ativo');
    }

    return asset;
  }

  // Atualizar um ativo
  async update(id: string, ticker: string, userId: string) {
    await this.findOne(id, userId); // Validação de acesso

    return this.prisma.asset.update({
      where: { id },
      data: { ticker },
    });
  }

  // Remover um ativo
  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Validação de acesso

    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
