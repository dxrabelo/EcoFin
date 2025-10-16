import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_transacoes" })
export class Transacao {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    tipo: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    descricao: string

    @ApiProperty()
    @UpdateDateColumn()
    data: Date

    @ApiProperty({ type: () => Categoria })
    @ManyToOne(() => Categoria, (categoria) => categoria.transacoes, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.transacoes, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}
