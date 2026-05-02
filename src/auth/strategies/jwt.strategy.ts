import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: JwtPayload) {
    // Passport уже проверил подпись и срок действия токена.
    // Здесь payload - это данные, которые были в токене

    // Ищем актуального пользователя в БД по id (payload.id)
    const user = await this.authService.validate(payload.id);

    // То, что возвращает метод validate() стратегии,
    // автоматически прикрепляется Passport'ом к объекту запроса как req.user
    return user;
  }
}
