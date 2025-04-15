import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  // Criar um novo ativo
  async create(ticker: string, userId: string) {
    return this.prisma.asset.create({
      data: {
        ticker,
        userId,
      },
    });
  }

  // Listar todos os ativos do usuário
  async findAll(userId: string) {
    return this.prisma.asset.findMany({
      where: { userId },
    });
  }

  // Buscar um ativo por ID (e garantir que pertence ao usuário)
  async findOne(id: string, userId: string) {
    const asset = await this.prisma.asset.findUnique({ where: { id } });

    if (!asset) {
      throw new NotFoundException('Ativo não encontrado');
    }

    if (asset.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a este ativo');
    }

    return asset;
  }

  // Atualizar um ativo
  async update(id: string, ticker: string, userId: string) {
    const asset = await this.findOne(id, userId); // garante que o ativo existe e pertence ao user

    return this.prisma.asset.update({
      where: { id },
      data: { ticker },
    });
  }

  // Remover um ativo
  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // valida se o user pode excluir

    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
