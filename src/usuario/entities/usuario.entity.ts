import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transacao } from "../../transacao/entities/transacao.entity"
import { Categoria } from "../../categoria/entities/categoria.entity"

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @IsEmail()
    @Column({ length: 255, nullable: false, unique: true })
    @ApiProperty({ example: "email@email.com.br" })
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    senha: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    dataCadastro: Date

    @ApiProperty({ type: () => [Categoria] })
    @OneToMany(() => Categoria, (categoria) => categoria.usuario)
    categorias: Categoria[]

    @ApiProperty({ type: () => [Transacao] })
    @OneToMany(() => Transacao, (transacao) => transacao.usuario)
    transacoes: Transacao[]
}
