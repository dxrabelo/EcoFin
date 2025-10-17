import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { EmailLogin } from '../entities/emaillogin.entity';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  // Verifica se o usuário existe e se a senha está correta
  async validateUser(email: string, senha: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByEmail(email);

    if (!buscaUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const senhaCorreta = await this.bcrypt.compararSenhas(
      senha,
      buscaUsuario.senha,
    );

    if (buscaUsuario && senhaCorreta) {
      const { senha, ...resultado } = buscaUsuario;
      return resultado;
    }

    return null;
  }

  // Gera o token JWT se o usuário for válido
  async login(emailLogin: EmailLogin) {
    const buscaUsuario = await this.usuarioService.findByEmail(emailLogin.email);

    if (!buscaUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const payload = { sub: buscaUsuario.id, email: buscaUsuario.email };

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      email: buscaUsuario.email,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
