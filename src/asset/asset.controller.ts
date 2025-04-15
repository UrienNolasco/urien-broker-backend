import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { AssetService } from './asset.service';
  import { CreateAssetDto } from './dto/create-asset.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { User } from '../common/decorators/user.decorator';
  
  @UseGuards(JwtAuthGuard)
  @Controller('assets')
  export class AssetController {
    constructor(private readonly assetService: AssetService) {}
  
    // Criar um novo ativo
    @Post()
    create(@Body() dto: CreateAssetDto, @User('userId') userId: string) {
      return this.assetService.create(dto.ticker, userId);
    }
  
    // Listar todos os ativos do usuário
    @Get()
    findAll(@User('sub') userId: string) {
      return this.assetService.findAll(userId);
    }
  
    // Buscar um ativo específico pelo ID
    @Get(':id')
    findOne(@Param('id') id: string, @User('sub') userId: string) {
      return this.assetService.findOne(id, userId);
    }
  
    // Atualizar um ativo (ex: se quiser permitir editar nome ou categoria no futuro)
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() dto: CreateAssetDto,
      @User('sub') userId: string,
    ) {
      return this.assetService.update(id, dto.ticker, userId);
    }
  
    // Remover um ativo
    @Delete(':id')
    remove(@Param('id') id: string, @User('sub') userId: string) {
      return this.assetService.remove(id, userId);
    }
  }
  