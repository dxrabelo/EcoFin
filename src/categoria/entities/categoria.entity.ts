import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transacao } from "../../transacao/entities/transacao.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty({ description: 'Nome da categoria (ex: Alimentação, Transporte, Lazer)' })
    nome: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty({ description: 'Ícone representativo (ex: 🍔, 🚗, 💰)' })
    icone: string

    @ApiProperty({ type: () => Usuario, description: 'Usuário dono da categoria' })
    @ManyToOne(() => Usuario, (usuario) => usuario.categorias, { onDelete: 'CASCADE' })
    usuario: Usuario

    @ApiProperty({ type: () => [Transacao], description: 'Transações associadas à categoria' })
    @OneToMany(() => Transacao, (transacao) => transacao.categoria)
    transacoes: Transacao[]
}
