import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import config from './config'
import { cert, initializeApp} from 'firebase-admin/app';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,
      load: [config],
    }), // Global ConfigModule
    MoviesModule,
  ],
})

export class AppModule {
  constructor(private configService: ConfigService) {
    initializeApp({
      credential: cert({
        projectId: configService.get('firebase.project_id'),
        privateKey: configService
          .get<string>('firebase.private_key'),
        clientEmail: configService.get('firebase.client_email'),
      }),
    });
  }
}
