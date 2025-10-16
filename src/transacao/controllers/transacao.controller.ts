import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Transacao } from "../entities/transacao.entity";
import { TransacaoService } from "../services/transacao.service";

@ApiTags('Transações')
@UseGuards(JwtAuthGuard)
@Controller("/transacoes")
@ApiBearerAuth()
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Transacao[]> {
    return this.transacaoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Transacao> {
    return this.transacaoService.findById(id);
  }

  @Get('/tipo/:tipo')
  @HttpCode(HttpStatus.OK)
  findByTipo(@Param('tipo') tipo: string): Promise<Transacao[]> {
    return this.transacaoService.findByTipo(tipo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() transacao: Transacao): Promise<Transacao> {
    return this.transacaoService.create(transacao);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() transacao: Transacao): Promise<Transacao> {
    return this.transacaoService.update(transacao);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.transacaoService.delete(id);
  }

}