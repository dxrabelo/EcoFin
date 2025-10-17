import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Agora o Passport vai procurar os campos "email" e "senha" no corpo do JSON
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<any> {
    const validaUsuario = await this.authService.validateUser(email, senha);

    if (!validaUsuario) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos!');
    }

    return validaUsuario;
  }
}
