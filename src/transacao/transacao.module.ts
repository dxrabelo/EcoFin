import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from './entities/transacao.entity';
import { CategoriaModule } from '../categoria/categoria.module';
import { TransacaoService } from './services/transacao.service';
import { TransacaoController } from './controllers/transacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao]), CategoriaModule],
  providers: [TransacaoService],
  controllers: [TransacaoController],
  exports: [TypeOrmModule],
})
export class TransacaoModule { }
