import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Transacao } from "../../transacao/entities/transacao.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '3112',
      database: 'db_EcoFin',
      entities: [Transacao, Categoria, Usuario],
      synchronize: false,
    };
  }
}