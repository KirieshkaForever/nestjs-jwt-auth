import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Nest.JS JWT Auth API')
    .setDescription('API documentation for Nest.JS JWT Authorization')
    .setVersion('1.0.0')
    .setContact('KirieshkaForever', '', '')
    .setLicense('MIT', 'https://github.com')
    .addBearerAuth()
    .build();
}
