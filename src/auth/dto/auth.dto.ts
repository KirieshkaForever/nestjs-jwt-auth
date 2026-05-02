import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
  @ApiProperty({
    description: 'JWT Access Token',
    example: 'eyJhbGci0iKwm83KJD8l28KOdg24K39KSOkejsK9...',
  })
  accessToken: string;
}
