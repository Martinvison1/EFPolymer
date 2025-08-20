import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));

  app.use(compression());
  app.use(cookieParser());

  // CORS configuration - localhost only
  app.enableCors({
    origin: ['https://localhost:5173', 'https://localhost:8443'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Serve static files (built frontend)
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'dist'), {
    prefix: '/',
    index: 'index.html'
  });

  // API Documentation
  const config = new DocumentBuilder()
    .setTitle('EF Polymer CRM API')
    .setDescription('Local-only CRM API for agronomy-focused sales management')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('session')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Global prefix for API routes
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 8443;
  const host = process.env.HOST || '127.0.0.1';

  await app.listen(port, host);
  
  console.log(`🚀 EF Polymer CRM is running on: https://${host}:${port}`);
  console.log(`📚 API Documentation: https://${host}:${port}/api/docs`);
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

bootstrap();