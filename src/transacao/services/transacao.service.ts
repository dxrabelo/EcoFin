import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Transacao } from '../entities/transacao.entity';
import { CategoriaService } from '../../categoria/service/categoria.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private transacaoRepository: Repository<Transacao>,
    private categoriaService: CategoriaService,
  ) { }

  async findAll(): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Transacao> {
    const transacao = await this.transacaoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });

    if (!transacao)
      throw new HttpException('Transação não encontrada!', HttpStatus.NOT_FOUND);

    return transacao;
  }

  async findByTipo(tipo: string): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      where: {
        tipo: ILike(`%${tipo}%`),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async create(transacao: Transacao): Promise<Transacao> {
    await this.categoriaService.findById(transacao.categoria.id);

    return await this.transacaoRepository.save(transacao);
  }

  async update(transacao: Transacao): Promise<Transacao> {
    await this.findById(transacao.id);

    await this.categoriaService.findById(transacao.categoria.id);

    return await this.transacaoRepository.save(transacao);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.transacaoRepository.delete(id);
  }
}
